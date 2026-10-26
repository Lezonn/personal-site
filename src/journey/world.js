import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import {
  palette,
  glowColors,
  mat,
  glowMat,
  add,
  cone,
  lamp,
  canvasTexture,
  car as buildCar
} from './kit'
import { builders } from './dioramas'

// The journey world: floating islands (one per stop) joined by a road, with a
// small car that drives from stop to stop as the page scrolls.
//
// Progress `t` comes from the page: 0 = hero overview, k = parked at stop k-1.
// Between two stops the car parks for the first/last 30% of the scroll so the
// story card can be read, and drives in the middle 40%.

const ISLAND_R = 11
const ROAD_X = 5.5 // road runs along each island's camera-facing edge (local x)
const ROAD_W = 4.2
const GAP = 40
const LANE = -0.95 // keep left, like on Indonesian roads
const ISLAND_Y = [0, -1.5, 0.6, -0.8, 1, -0.4]
const VIEW_DIR = new THREE.Vector3(1, 0.78, 0.62).normalize()

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

export function islandCenter(i) {
  return new THREE.Vector3(i % 2 ? 16 : 0, ISLAND_Y[i % ISLAND_Y.length], -GAP * i)
}

// ---------- geometry builders ----------

function buildIslandBase(island) {
  add(
    island,
    new THREE.CylinderGeometry(ISLAND_R, ISLAND_R * 0.93, 1.6, 12),
    palette.grass,
    [0, -0.8, 0]
  )
  add(
    island,
    new THREE.CylinderGeometry(ISLAND_R + 0.08, ISLAND_R + 0.08, 0.22, 12),
    palette.tealLight,
    [0, -0.15, 0]
  )
  add(island, new THREE.ConeGeometry(ISLAND_R * 0.93, 8, 12), palette.rock, [0, -5.6, 0], [Math.PI])
  for (const [x, z, h] of [
    [-5, 3, 4],
    [4, -5, 3],
    [2, 6, 2.6]
  ]) {
    cone(island, [1.6, h, 6], [x, -1.6 - h, z], palette.rockDark, [Math.PI])
  }
}

// Flat strip that follows the curve; `depth` adds side walls (bridge deck).
function ribbon(points, tangents, halfWidth, offset, lift, depth = 0) {
  const pos = []
  const index = []
  const n = points.length
  const side = new THREE.Vector3()
  for (let i = 0; i < n; i++) {
    const p = points[i]
    const t = tangents[i]
    side.set(-t.z, 0, t.x).normalize()
    const cx = p.x + side.x * offset
    const cz = p.z + side.z * offset
    const y = p.y + lift
    pos.push(cx - side.x * halfWidth, y, cz - side.z * halfWidth)
    pos.push(cx + side.x * halfWidth, y, cz + side.z * halfWidth)
    if (depth) {
      pos.push(cx - side.x * halfWidth, y - depth, cz - side.z * halfWidth)
      pos.push(cx + side.x * halfWidth, y - depth, cz + side.z * halfWidth)
    }
  }
  const stride = depth ? 4 : 2
  for (let i = 0; i < n - 1; i++) {
    const a = i * stride
    const b = (i + 1) * stride
    index.push(a, a + 1, b, a + 1, b + 1, b)
    if (depth) {
      index.push(a, b, a + 2, b, b + 2, a + 2)
      index.push(a + 1, a + 3, b + 1, b + 1, a + 3, b + 3)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setIndex(index)
  geo.computeVertexNormals()
  return geo
}

// Instanced small boxes along the curve (lane dashes, railing posts).
function instancesAlong(curve, length, step, geometry, material, place) {
  const items = []
  const dummy = new THREE.Object3D()
  for (let d = step / 2; d < length; d += step) {
    const u = d / length
    const p = curve.getPointAt(u)
    const t = curve.getTangentAt(u)
    for (const m of place(p, t, d)) items.push(m)
  }
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(items.length, 1))
  items.forEach(([p, t], i) => {
    dummy.position.copy(p)
    dummy.lookAt(p.x + t.x, p.y, p.z + t.z)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
  })
  mesh.count = items.length
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// Merge every static mesh of an island into one mesh per material: a whole
// diorama costs a handful of draw calls instead of hundreds.
function mergeStatic(root) {
  root.updateMatrixWorld(true)
  const inverse = new THREE.Matrix4().copy(root.matrixWorld).invert()
  const meshes = []
  const collect = (obj) => {
    for (const child of obj.children) {
      if (child.userData.dynamic) continue
      if (child.isMesh && !child.isInstancedMesh && !child.material.transparent) meshes.push(child)
      collect(child)
    }
  }
  collect(root)
  const buckets = new Map()
  const m = new THREE.Matrix4()
  for (const mesh of meshes) {
    let geo = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone()
    for (const name of Object.keys(geo.attributes)) {
      if (!['position', 'normal', 'uv'].includes(name)) geo.deleteAttribute(name)
    }
    if (!geo.attributes.uv) {
      geo.setAttribute(
        'uv',
        new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2)
      )
    }
    geo.applyMatrix4(m.multiplyMatrices(inverse, mesh.matrixWorld))
    if (!buckets.has(mesh.material)) buckets.set(mesh.material, [])
    buckets.get(mesh.material).push(geo)
    mesh.geometry.dispose()
    mesh.parent.remove(mesh)
  }
  for (const [material, geos] of buckets) {
    const merged = mergeGeometries(geos)
    geos.forEach((g) => g.dispose())
    const mesh = new THREE.Mesh(merged, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    root.add(mesh)
  }
}

function buildSky() {
  return canvasTexture(16, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, '#020d0b')
    g.addColorStop(0.55, '#082621')
    g.addColorStop(1, '#0f3d36')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  })
}

function softDot() {
  return canvasTexture(64, 64, (ctx) => {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.5)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
  })
}

// ---------- world ----------

export function createWorld(canvas, { stops, tier = 'high', onFirstFrame } = {}) {
  const high = tier === 'high'
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: high,
    powerPreference: 'high-performance'
  })
  const maxDpr = high ? 2 : 1.25
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  renderer.setPixelRatio(dpr)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = high
  renderer.shadowMap.type = THREE.PCFShadowMap

  const scene = new THREE.Scene()
  scene.background = buildSky()
  scene.fog = new THREE.Fog('#0c322c', 60, 200)

  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 1400)

  // lights
  scene.add(new THREE.HemisphereLight('#a8d5ca', '#0a2e29', 1.15))
  scene.add(new THREE.AmbientLight('#f2ecdd', 0.18))
  const moonLight = new THREE.DirectionalLight('#f7efdc', 1.7)
  moonLight.castShadow = high
  moonLight.shadow.mapSize.set(2048, 2048)
  Object.assign(moonLight.shadow.camera, {
    left: -32,
    right: 32,
    top: 32,
    bottom: -32,
    near: 1,
    far: 220
  })
  moonLight.shadow.bias = -0.0006
  moonLight.shadow.normalBias = 0.04
  scene.add(moonLight, moonLight.target)
  const lightDir = new THREE.Vector3(-0.45, 1, 0.55).normalize()

  // islands + dioramas
  const updaters = []
  const centers = stops.map((_, i) => islandCenter(i))
  stops.forEach((stop, i) => {
    const island = new THREE.Group()
    island.position.copy(centers[i])
    buildIslandBase(island)
    const glow = glowColors[stop.glow] || glowColors.code
    const build = builders[stop.scene]
    if (build) {
      const update = build(island, { glow, label: stop.sign })
      if (update) updaters.push(update)
    }
    lamp(island, [ROAD_X + 2.9, 7.4], glow)
    lamp(island, [ROAD_X + 2.9, -7.4], glow)
    mergeStatic(island)
    scene.add(island)
  })

  // road: five control points per island keep it straight and flat on the
  // islands (fewer let the spline sag below the island surface)
  const roadPoints = []
  centers.forEach((c) => {
    for (const dz of [9, 4.5, 0, -4.5, -9]) {
      roadPoints.push(new THREE.Vector3(c.x + ROAD_X, c.y + 0.08, c.z + dz))
    }
  })
  const curve = new THREE.CatmullRomCurve3(roadPoints, false, 'centripetal')
  const roadLength = curve.getLength()
  const samples = Math.ceil(roadLength * 1.5)
  const pts = curve.getSpacedPoints(samples)
  const tans = pts.map((_, i) => curve.getTangentAt(i / samples))
  const roadMat = new THREE.MeshStandardMaterial({
    color: palette.asphalt,
    roughness: 0.95,
    flatShading: true,
    side: THREE.DoubleSide
  })
  const road = new THREE.Mesh(ribbon(pts, tans, ROAD_W / 2, 0, 0, 0.7), roadMat)
  road.receiveShadow = true
  scene.add(road)
  const edgeMat = new THREE.MeshBasicMaterial({ color: palette.creamDim, toneMapped: false })
  for (const side of [-1, 1]) {
    scene.add(new THREE.Mesh(ribbon(pts, tans, 0.07, side * (ROAD_W / 2 - 0.28), 0.02), edgeMat))
  }
  scene.add(
    instancesAlong(
      curve,
      roadLength,
      2.6,
      new THREE.BoxGeometry(0.14, 0.03, 1.15),
      glowMat(palette.gold, 1.1),
      (p, t) => [[p.clone().setY(p.y + 0.02), t]]
    )
  )
  // railing posts with small lights, only where the road leaves the islands
  const onIsland = (p) => centers.some((c) => Math.hypot(p.x - c.x, p.z - c.z) < ISLAND_R - 0.4)
  const side = new THREE.Vector3()
  const railPlace = (lift) => (p, t) => {
    if (onIsland(p)) return []
    side.set(-t.z, 0, t.x).normalize()
    return [-1, 1].map((s) => [
      new THREE.Vector3(
        p.x + side.x * s * (ROAD_W / 2 - 0.05),
        p.y + lift,
        p.z + side.z * s * (ROAD_W / 2 - 0.05)
      ),
      t
    ])
  }
  scene.add(
    instancesAlong(
      curve,
      roadLength,
      2,
      new THREE.BoxGeometry(0.12, 0.8, 0.12),
      mat(palette.cream),
      railPlace(0.4)
    )
  )
  scene.add(
    instancesAlong(
      curve,
      roadLength,
      6,
      new THREE.BoxGeometry(0.18, 0.12, 0.18),
      glowMat(palette.gold, 2),
      railPlace(0.86)
    )
  )

  // where the car parks at each stop (closest curve point to the island's road center)
  const stopU = centers.map((c) => {
    const target = new THREE.Vector3(c.x + ROAD_X, c.y, c.z)
    let best = 0
    let bestD = Infinity
    pts.forEach((p, i) => {
      const d = p.distanceToSquared(target)
      if (d < bestD) {
        bestD = d
        best = i / samples
      }
    })
    return best
  })

  // the car (= Leo)
  const hero = buildCar(palette.gold, { lights: true })
  hero.scale.setScalar(1.05)
  scene.add(hero)
  const wheels = hero.userData.wheels

  // stars + drifting bubbles (the old hero motif, now in the night sky)
  const dot = softDot()
  const routeMid = centers[0].clone().lerp(centers[centers.length - 1], 0.5)
  {
    const n = high ? 900 : 450
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.42
      const r = 600
      arr[i * 3] = routeMid.x + r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi) - 60
      arr[i * 3 + 2] = routeMid.z + r * Math.sin(phi) * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    scene.add(
      new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          color: palette.cream,
          size: 2.2,
          sizeAttenuation: false,
          map: dot,
          transparent: true,
          depthWrite: false,
          fog: false
        })
      )
    )
  }
  const bubbleCount = high ? 160 : 80
  const bubblePos = new Float32Array(bubbleCount * 3)
  const bubbleSpeed = new Float32Array(bubbleCount)
  const span = { x: [-50, 70], y: [-30, 40], z: [30, -GAP * (stops.length - 1) - 40] }
  for (let i = 0; i < bubbleCount; i++) {
    bubblePos[i * 3] = THREE.MathUtils.randFloat(...span.x)
    bubblePos[i * 3 + 1] = THREE.MathUtils.randFloat(...span.y)
    bubblePos[i * 3 + 2] = THREE.MathUtils.randFloat(span.z[1], span.z[0])
    bubbleSpeed[i] = THREE.MathUtils.randFloat(0.6, 1.8)
  }
  const bubbleGeo = new THREE.BufferGeometry()
  bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePos, 3))
  const bubbles = new THREE.Points(
    bubbleGeo,
    new THREE.PointsMaterial({
      color: '#cfe3db',
      size: 1.3,
      map: dot,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )
  scene.add(bubbles)

  // moon
  const moon = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: dot, color: '#fff6e0', fog: false, depthWrite: false })
  )
  moon.position.set(routeMid.x - 260, 260, routeMid.z - 360)
  moon.scale.setScalar(90)
  scene.add(moon)

  // ---------- camera choreography ----------

  let width = 1
  let height = 1
  let portrait = false
  const overview = {
    focus: routeMid.clone().add(new THREE.Vector3(10, -6, 4)),
    dir: new THREE.Vector3(1, 1.05, 0.45).normalize(),
    dist: 250
  }
  const stopFocus = centers.map((c) => new THREE.Vector3(c.x + 1.5, c.y + 1.4, c.z))

  // screen-space nudge so the island sits beside (desktop) or above (mobile) its card
  function stopShift(i) {
    return portrait ? [0, 0.17] : [i % 2 ? -0.2 : 0.2, 0.02]
  }
  function heroShift() {
    return portrait ? [0, -0.16] : [0.16, 0]
  }
  // far enough that an island (~30 units with its road) fits the narrow side
  function stopDist() {
    const aspect = width / height
    return portrait ? clamp(31 / (0.573 * aspect), 60, 130) : clamp(58 * (1.6 / aspect), 50, 72)
  }

  const focus = new THREE.Vector3()
  const camPos = new THREE.Vector3()
  const tmpA = new THREE.Vector3()
  const tmpB = new THREE.Vector3()
  const state = { carU: 0, shift: [0, 0], fogNear: 60, fogFar: 200 }

  function stopPose(i, outFocus, outPos) {
    outFocus.copy(stopFocus[i])
    outPos.copy(outFocus).addScaledVector(VIEW_DIR, stopDist())
  }

  function solve(t) {
    const n = stops.length
    t = clamp(t, 0, n)
    if (t <= 1) {
      const e = easeInOut(t)
      stopPose(0, tmpA, tmpB)
      focus.copy(overview.focus).lerp(tmpA, e)
      camPos.copy(overview.focus).addScaledVector(overview.dir, overview.dist).lerp(tmpB, e)
      const hs = heroShift()
      const ss = stopShift(0)
      state.shift = [hs[0] + (ss[0] - hs[0]) * e, hs[1] + (ss[1] - hs[1]) * e]
      state.carU = stopU[0]
      state.fogNear = 240 + (60 - 240) * e
      state.fogFar = 620 + (200 - 620) * e
      return
    }
    const a = Math.min(Math.floor(t) - 1, n - 1)
    const b = Math.min(a + 1, n - 1)
    const s = smoothstep(0.3, 0.7, t - Math.floor(t))
    state.carU = stopU[a] + (stopU[b] - stopU[a]) * s
    focus.copy(stopFocus[a]).lerp(stopFocus[b], s)
    camPos.copy(focus).addScaledVector(VIEW_DIR, stopDist())
    const sa = stopShift(a)
    const sb = stopShift(b)
    state.shift = [sa[0] + (sb[0] - sa[0]) * s, sa[1] + (sb[1] - sa[1]) * s]
    state.fogNear = 60
    state.fogFar = 200
  }

  // ---------- loop ----------

  let targetT = 0
  let currentT = 0
  let lastCarU = stopU[0]
  let running = false
  let raf = 0
  let last = 0
  let elapsed = 0
  let firstFrame = true
  const perf = { frames: 0, total: 0 }

  function place() {
    solve(currentT)
    camera.position.copy(camPos)
    camera.lookAt(focus)
    camera.setViewOffset(
      width,
      height,
      -state.shift[0] * width,
      state.shift[1] * height,
      width,
      height
    )
    scene.fog.near = state.fogNear
    scene.fog.far = state.fogFar

    const p = curve.getPointAt(state.carU)
    const tan = curve.getTangentAt(state.carU)
    side.set(-tan.z, 0, tan.x).normalize()
    hero.position.copy(p).addScaledVector(side, LANE)
    hero.lookAt(hero.position.x + tan.x, hero.position.y + tan.y, hero.position.z + tan.z)
    const travelled = (state.carU - lastCarU) * roadLength
    lastCarU = state.carU
    wheels.forEach((w) => (w.rotation.x += travelled / 0.36))

    if (high) {
      moonLight.position.copy(focus).addScaledVector(lightDir, 90)
      moonLight.target.position.copy(focus)
    }
  }

  function frame(now) {
    raf = requestAnimationFrame(frame)
    const dt = Math.min((now - last) / 1000, 0.1)
    last = now
    elapsed += dt
    currentT += (targetT - currentT) * (1 - Math.exp(-dt * 5))
    if (Math.abs(targetT - currentT) < 1e-4) currentT = targetT
    place()
    updaters.forEach((u) => u(elapsed, dt))
    const arr = bubbleGeo.attributes.position.array
    for (let i = 0; i < bubbleCount; i++) {
      arr[i * 3 + 1] += bubbleSpeed[i] * dt
      if (arr[i * 3 + 1] > span.y[1]) arr[i * 3 + 1] = span.y[0]
    }
    bubbleGeo.attributes.position.needsUpdate = true
    renderer.render(scene, camera)
    if (firstFrame) {
      firstFrame = false
      onFirstFrame?.()
    }
    adapt(dt)
  }

  // drop resolution (then shadows) if the device can't keep up
  function adapt(dt) {
    perf.frames++
    if (perf.frames < 30) return
    perf.total += dt
    if (perf.frames < 120) return
    const avg = perf.total / 90
    perf.frames = 0
    perf.total = 0
    if (avg < 1 / 28) return
    if (dpr > 1) {
      dpr = Math.max(1, dpr * 0.75)
      renderer.setPixelRatio(dpr)
      renderer.setSize(width, height, false)
    } else if (renderer.shadowMap.enabled) {
      renderer.shadowMap.enabled = false
      moonLight.castShadow = false
    }
  }

  const api = {
    setProgress(t) {
      targetT = t
    },
    jumpTo(t) {
      targetT = currentT = t
      if (!running) place()
    },
    resize(w, h) {
      width = Math.max(1, Math.round(w))
      height = Math.max(1, Math.round(h))
      portrait = width / height < 0.9
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      if (!running) {
        place()
        renderer.render(scene, camera)
      }
    },
    start() {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
    },
    dispose() {
      api.stop()
      scene.traverse((obj) => {
        obj.geometry?.dispose()
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => {
          m?.map?.dispose()
          m?.dispose()
        })
      })
      scene.background?.dispose()
      renderer.dispose()
    }
  }

  if (import.meta.env.DEV) window.__journeyWorld = api
  return api
}
