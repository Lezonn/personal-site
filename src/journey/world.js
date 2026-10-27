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
  look,
  car as buildCar
} from './kit'
import { builders } from './dioramas'
import { worldTheme as theme } from './themes'

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

function buildIslandBase(island, theme) {
  add(
    island,
    new THREE.CylinderGeometry(ISLAND_R, ISLAND_R * 0.93, 1.6, 12),
    theme.grass,
    [0, -0.8, 0]
  )
  add(
    island,
    new THREE.CylinderGeometry(ISLAND_R + 0.08, ISLAND_R + 0.08, 0.22, 12),
    theme.rim,
    [0, -0.15, 0]
  )
  add(island, new THREE.ConeGeometry(ISLAND_R * 0.93, 8, 12), theme.rock, [0, -5.6, 0], [Math.PI])
  for (const [x, z, h] of [
    [-5, 3, 4],
    [4, -5, 3],
    [2, 6, 2.6]
  ]) {
    cone(island, [1.6, h, 6], [x, -1.6 - h, z], theme.rockDark, [Math.PI])
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

function buildSky([top, mid, bottom]) {
  return canvasTexture(16, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, top)
    g.addColorStop(0.55, mid)
    g.addColorStop(1, bottom)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  })
}

// A soap bubble: clear middle, bright rim, a small highlight.
function bubbleTexture() {
  return canvasTexture(128, 128, (ctx) => {
    const fill = ctx.createRadialGradient(64, 64, 0, 64, 64, 60)
    fill.addColorStop(0, 'rgba(255,255,255,0.04)')
    fill.addColorStop(0.75, 'rgba(255,255,255,0.18)')
    fill.addColorStop(0.93, 'rgba(255,255,255,0.85)')
    fill.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = fill
    ctx.beginPath()
    ctx.arc(64, 64, 60, 0, Math.PI * 2)
    ctx.fill()
    const rim = ctx.createLinearGradient(0, 0, 128, 128)
    rim.addColorStop(0, 'rgba(127,220,196,0.7)')
    rim.addColorStop(1, 'rgba(242,184,79,0.6)')
    ctx.strokeStyle = rim
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(64, 64, 55, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,255,0.95)'
    ctx.beginPath()
    ctx.ellipse(44, 40, 12, 7, -0.7, 0, Math.PI * 2)
    ctx.fill()
  })
}

// ---------- world ----------

// framing (optional, per layout): where the island sits on screen and how far
// the camera stands. hero(portrait) / stop(i, portrait) → [shiftX, shiftY] as a
// fraction of the canvas; distScale(portrait) multiplies the stop distance.
// pinOffset: island-local point, or (i, portrait) => point, projected to screen px for onFrame.
export function createWorld(
  canvas,
  { stops, tier = 'high', framing, pinOffset, onFrame, onFirstFrame } = {}
) {
  const high = tier === 'high'
  look.glow = theme.glow
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: high,
    powerPreference: 'high-performance'
  })
  const maxDpr = high ? 2 : 1.25
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  renderer.setPixelRatio(dpr)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = theme.exposure
  renderer.shadowMap.enabled = high
  renderer.shadowMap.type = THREE.PCFShadowMap

  const scene = new THREE.Scene()
  scene.background = buildSky(theme.sky)
  scene.fog = new THREE.Fog(theme.fog, ...theme.fogStop)

  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 1400)

  // lights
  scene.add(new THREE.HemisphereLight(...theme.hemi))
  scene.add(new THREE.AmbientLight(...theme.ambient))
  const moonLight = new THREE.DirectionalLight(...theme.sun)
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
    buildIslandBase(island, theme)
    const glow = glowColors[stop.glow] || glowColors.code
    const build = builders[stop.scene]
    if (build) {
      const update = build(island, { glow, label: stop.sign, brand: stop.brand })
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
    color: theme.asphalt,
    roughness: 0.95,
    flatShading: true,
    side: THREE.DoubleSide
  })
  const road = new THREE.Mesh(ribbon(pts, tans, ROAD_W / 2, 0, 0, 0.7), roadMat)
  road.receiveShadow = true
  scene.add(road)
  const edgeMat = new THREE.MeshBasicMaterial({ color: theme.edge, toneMapped: false })
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
  const hero = buildCar(palette.gold)
  hero.scale.setScalar(1.05)
  scene.add(hero)
  const wheels = hero.userData.wheels

  // the site's bubble motif: glassy bubbles drifting up past the islands, plus a few clouds
  const routeMid = centers[0].clone().lerp(centers[centers.length - 1], 0.5)
  const bubbleTex = bubbleTexture()
  const span = { x: [-50, 70], y: [-30, 40], z: [30, -GAP * (stops.length - 1) - 40] }
  const bubbleLayers = [
    { count: high ? 110 : 55, size: 1.6, speed: [0.6, 1.4] },
    { count: high ? 40 : 20, size: 3.2, speed: [0.4, 0.9] }
  ].map(({ count, size, speed }) => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = THREE.MathUtils.randFloat(...span.x)
      pos[i * 3 + 1] = THREE.MathUtils.randFloat(...span.y)
      pos[i * 3 + 2] = THREE.MathUtils.randFloat(span.z[1], span.z[0])
      vel[i] = THREE.MathUtils.randFloat(...speed)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    scene.add(
      new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          size,
          map: bubbleTex,
          transparent: true,
          opacity: 0.9,
          depthWrite: false
        })
      )
    )
    return { geo, vel, count }
  })

  const clouds = []
  const cloudMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 0.45,
    roughness: 1,
    transparent: true,
    opacity: 0.88
  })
  for (let i = 0; i < 9; i++) {
    const cloud = new THREE.Group()
    const puffs = 3 + (i % 3)
    for (let k = 0; k < puffs; k++) {
      const r = THREE.MathUtils.randFloat(2.2, 4)
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), cloudMat)
      puff.position.set(k * 3 - puffs * 1.5, Math.random() * 1.2, Math.random() * 2)
      cloud.add(puff)
    }
    cloud.scale.set(1.3, 0.55, 0.9)
    cloud.position.set(
      i % 2 ? THREE.MathUtils.randFloat(-90, -40) : THREE.MathUtils.randFloat(50, 100),
      THREE.MathUtils.randFloat(32, 48),
      THREE.MathUtils.randFloat(span.z[1], span.z[0])
    )
    cloud.userData.speed = THREE.MathUtils.randFloat(0.4, 1)
    scene.add(cloud)
    clouds.push(cloud)
  }

  // ---------- camera choreography ----------

  let width = 1
  let height = 1
  let portrait = false
  // opening shot: from behind the first stop, looking down the whole road
  // (steeper and straighter on portrait screens so the road runs up the page)
  const overviewFocus = routeMid.clone().add(new THREE.Vector3(2, -6, 6))
  const overviewDir = {
    wide: new THREE.Vector3(0.62, 0.7, 1).normalize(),
    tall: new THREE.Vector3(0.22, 0.95, 1).normalize()
  }
  const stopFocus = centers.map((c) => new THREE.Vector3(c.x + 1.5, c.y + 1.4, c.z))

  // screen-space nudge so the island sits beside (desktop) or above (mobile) its card
  function stopShift(i) {
    if (framing?.stop) return framing.stop(i, portrait)
    return portrait ? [0, 0.17] : [i % 2 ? -0.2 : 0.2, 0.02]
  }
  function heroShift() {
    if (framing?.hero) return framing.hero(portrait)
    return portrait ? [0.02, -0.21] : [0.23, 0.06]
  }
  function overviewCamera(out) {
    const dir = portrait ? overviewDir.tall : overviewDir.wide
    return out.copy(overviewFocus).addScaledVector(dir, portrait ? 400 : 205)
  }
  // far enough that an island (~30 units with its road) fits the narrow side
  function stopDist() {
    const aspect = width / height
    const base = portrait
      ? clamp(31 / (0.573 * aspect), 60, 130)
      : clamp(58 * (1.6 / aspect), 50, 72)
    return base * (framing?.distScale?.(portrait) ?? 1)
  }
  // slow idle orbit so a parked diorama never looks like a still image
  const viewDir = new THREE.Vector3()
  const UP = new THREE.Vector3(0, 1, 0)
  let orbitTime = 0

  const focus = new THREE.Vector3()
  const camPos = new THREE.Vector3()
  const tmpA = new THREE.Vector3()
  const tmpB = new THREE.Vector3()
  const state = { carU: 0, shift: [0, 0], fogNear: 60, fogFar: 200 }

  function stopPose(i, outFocus, outPos) {
    outFocus.copy(stopFocus[i])
    outPos.copy(outFocus).addScaledVector(viewDir, stopDist())
  }

  function solve(t) {
    const n = stops.length
    t = clamp(t, 0, n)
    viewDir.copy(VIEW_DIR).applyAxisAngle(UP, Math.sin(orbitTime * 0.2) * 0.09)
    if (t <= 1) {
      const e = easeInOut(t)
      stopPose(0, tmpA, tmpB)
      focus.copy(overviewFocus).lerp(tmpA, e)
      overviewCamera(camPos).lerp(tmpB, e)
      const hs = heroShift()
      const ss = stopShift(0)
      state.shift = [hs[0] + (ss[0] - hs[0]) * e, hs[1] + (ss[1] - hs[1]) * e]
      state.carU = stopU[0]
      state.fogNear = theme.fogHero[0] + (theme.fogStop[0] - theme.fogHero[0]) * e
      state.fogFar = theme.fogHero[1] + (theme.fogStop[1] - theme.fogHero[1]) * e
      return
    }
    const a = Math.min(Math.floor(t) - 1, n - 1)
    const b = Math.min(a + 1, n - 1)
    const s = smoothstep(0.3, 0.7, t - Math.floor(t))
    state.carU = stopU[a] + (stopU[b] - stopU[a]) * s
    focus.copy(stopFocus[a]).lerp(stopFocus[b], s)
    camPos.copy(focus).addScaledVector(viewDir, stopDist())
    const sa = stopShift(a)
    const sb = stopShift(b)
    state.shift = [sa[0] + (sb[0] - sa[0]) * s, sa[1] + (sb[1] - sa[1]) * s]
    state.fogNear = theme.fogStop[0]
    state.fogFar = theme.fogStop[1]
  }

  // screen position (CSS px) of each island's pin, for layouts that tether DOM to the world
  const projected = centers.map(() => ({ x: 0, y: 0, behind: false }))
  const ndc = new THREE.Vector3()
  function project() {
    camera.updateMatrixWorld()
    centers.forEach((c, i) => {
      const off = typeof pinOffset === 'function' ? pinOffset(i, portrait) : pinOffset || [0, 5, 0]
      ndc.set(c.x + off[0], c.y + off[1], c.z + off[2]).project(camera)
      projected[i].x = ((ndc.x + 1) / 2) * width
      projected[i].y = ((1 - ndc.y) / 2) * height
      projected[i].behind = ndc.z > 1
    })
    return projected
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
    orbitTime += dt
    currentT += (targetT - currentT) * (1 - Math.exp(-dt * 5))
    if (Math.abs(targetT - currentT) < 1e-4) currentT = targetT
    place()
    updaters.forEach((u) => u(elapsed, dt))
    for (const { geo, vel, count } of bubbleLayers) {
      const arr = geo.attributes.position.array
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += vel[i] * dt
        if (arr[i * 3 + 1] > span.y[1]) arr[i * 3 + 1] = span.y[0]
      }
      geo.attributes.position.needsUpdate = true
    }
    for (const cloud of clouds) {
      cloud.position.x += cloud.userData.speed * dt
      if (cloud.position.x > 110) cloud.position.x = -110
    }
    renderer.render(scene, camera)
    onFrame?.({ t: currentT, pins: project() })
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
    // re-solve the camera after a layout's framing changes (e.g. a drawer opens)
    refresh() {
      if (!running) {
        place()
        renderer.render(scene, camera)
      }
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
