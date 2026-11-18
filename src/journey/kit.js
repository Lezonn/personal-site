import * as THREE from 'three'

// Low-poly building blocks for the dioramas. Every helper takes the parent
// group first and places the shape with its *base* at the given y, so props
// can be stacked by height without doing the half-height math each time.

export const palette = {
  ink: '#0a2e29',
  inkSoft: '#10403a',
  teal: '#075a4e',
  tealLight: '#1f7a6a',
  grass: '#1a5a4e',
  rock: '#163430',
  rockDark: '#0e2522',
  asphalt: '#1c2a28',
  cream: '#f2ecdd',
  creamDim: '#b9cdc4',
  sand: '#d8ccae',
  wood: '#a77b52',
  gold: '#e8b04b',
  coral: '#c96f4a',
  slate: '#7a9ba8',
  steel: '#5b6f6c',
  glass: '#9fc7c0',
  tire: '#1a1f1e'
}

export const glowColors = {
  ai: '#f2b84f',
  code: '#7fdcc4'
}

const materials = new Map()

// Shared flat-shaded material per color so meshes can be merged per island.
export function mat(color, extra) {
  const key = extra ? `${color}|${JSON.stringify(extra)}` : color
  if (!materials.has(key)) {
    materials.set(
      key,
      new THREE.MeshStandardMaterial({
        color,
        flatShading: true,
        roughness: 0.82,
        metalness: 0,
        ...extra
      })
    )
  }
  return materials.get(key)
}

export function glowMat(color, intensity = 1.6) {
  return mat(color, { emissive: color, emissiveIntensity: intensity, roughness: 0.4 })
}

export function glassMat(color = palette.glass, opacity = 0.22) {
  const key = `glass|${color}|${opacity}`
  if (!materials.has(key)) {
    materials.set(
      key,
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        roughness: 0.1,
        metalness: 0.1,
        depthWrite: false
      })
    )
  }
  return materials.get(key)
}

function toMat(m) {
  return m instanceof THREE.Material ? m : mat(m)
}

export function add(parent, geometry, material, [x, y, z], rot) {
  const mesh = new THREE.Mesh(geometry, toMat(material))
  mesh.position.set(x, y, z)
  if (rot) mesh.rotation.set(rot[0] || 0, rot[1] || 0, rot[2] || 0)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

export function box(parent, [w, h, d], [x, y, z], material, rot) {
  return add(parent, new THREE.BoxGeometry(w, h, d), material, [x, y + h / 2, z], rot)
}

export function cyl(parent, [rTop, rBottom, h, seg = 8], [x, y, z], material, rot) {
  return add(
    parent,
    new THREE.CylinderGeometry(rTop, rBottom, h, seg),
    material,
    [x, y + h / 2, z],
    rot
  )
}

export function cone(parent, [r, h, seg = 7], [x, y, z], material, rot) {
  return add(parent, new THREE.ConeGeometry(r, h, seg), material, [x, y + h / 2, z], rot)
}

export function ball(parent, r, [x, y, z], material, detail = 0) {
  return add(parent, new THREE.IcosahedronGeometry(r, detail), material, [x, y + r, z])
}

// A group that animates or must stay separate (not merged into the island mesh).
export function dynamicGroup(parent, [x, y, z] = [0, 0, 0]) {
  const g = new THREE.Group()
  g.position.set(x, y, z)
  g.userData.dynamic = true
  parent.add(g)
  return g
}

// Theme-wide knobs read while building (see themes.js): `glow` scales every
// halo / light pool, since additive glows that sing at night wash out by day.
export const look = { glow: 1 }

// ---------- textures ----------

let haloTexture = null
function getHaloTexture() {
  if (haloTexture) return haloTexture
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.25, 'rgba(255,255,255,0.45)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  haloTexture = new THREE.CanvasTexture(c)
  haloTexture.colorSpace = THREE.SRGBColorSpace
  return haloTexture
}

// Soft additive glow; fakes bloom without a post-processing pass.
export function halo(parent, [x, y, z], size, color, opacity = 0.55) {
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: getHaloTexture(),
      color,
      transparent: true,
      opacity: opacity * look.glow,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  )
  sprite.position.set(x, y, z)
  sprite.scale.set(size, size, size)
  sprite.userData.dynamic = true
  parent.add(sprite)
  return sprite
}

// Flat light pool on the ground (street lamps, headlights).
export function lightPool(parent, [x, y, z], size, color, opacity = 0.35) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: getHaloTexture(),
      color,
      transparent: true,
      opacity: opacity * look.glow,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.position.set(x, y + 0.03, z)
  mesh.userData.dynamic = true
  parent.add(mesh)
  return mesh
}

export function canvasTexture(width, height, draw) {
  const c = document.createElement('canvas')
  c.width = width
  c.height = height
  draw(c.getContext('2d'), width, height)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

// Brand signboard: the company logo with the place's name underneath. Until
// brand.logo loads (or if the file is missing) the plate shows the brand name.
export function sign(parent, caption, { pos, width = 6, rotY = 0, glow, brand }) {
  const height = width * 0.3
  const g = dynamicGroup(parent, pos)
  g.rotation.y = rotY
  box(g, [width + 0.3, height + 0.3, 0.25], [0, -0.15, -0.14], palette.ink)
  const W = 1024
  const H = Math.round(W * 0.3)
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  const draw = (logo) => {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)
    const logoBox = { x: W * 0.06, y: H * 0.1, w: W * 0.88, h: H * 0.56 }
    if (logo) {
      const k = Math.min(logoBox.w / logo.width, logoBox.h / logo.height)
      const lw = logo.width * k
      const lh = logo.height * k
      ctx.drawImage(logo, (W - lw) / 2, logoBox.y + (logoBox.h - lh) / 2, lw, lh)
    } else if (brand) {
      ctx.fillStyle = '#0a2e29'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      let size = H * 0.42
      ctx.font = `700 ${size}px Poppins, "Segoe UI", sans-serif`
      while (ctx.measureText(brand.name).width > logoBox.w && size > 20) {
        size -= 4
        ctx.font = `700 ${size}px Poppins, "Segoe UI", sans-serif`
      }
      ctx.fillText(brand.name, W / 2, logoBox.y + logoBox.h / 2)
    }
    // caption strip in the stop's tech colour
    ctx.fillStyle = glow || '#075a4e'
    ctx.fillRect(0, H * 0.74, W, H * 0.26)
    ctx.fillStyle = '#0a2e29'
    ctx.font = `700 ${H * 0.15}px Poppins, "Segoe UI", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(H * 0.025)}px`
    ctx.fillText(caption, W / 2, H * 0.875)
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  }
  draw(null)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  if (brand?.logo) {
    const img = new Image()
    img.onload = () => {
      draw(img)
      tex.needsUpdate = true
    }
    img.src = brand.logo
  }
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })
  )
  face.position.set(0, height / 2, 0)
  g.add(face)
  return g
}

// Night facade: a grid of windows, some lit. Glows through emissiveMap.
export function facade(
  parent,
  [w, h],
  [x, y, z],
  rotY,
  { cols, rows, lit = 0.55, wall = '#123a34', seed = 1 }
) {
  let s = seed
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280
  const tex = canvasTexture(cols * 32, rows * 40, (ctx, cw, ch) => {
    ctx.fillStyle = wall
    ctx.fillRect(0, 0, cw, ch)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.fillStyle = rand() < lit ? (rand() < 0.75 ? '#ffd58a' : '#cfeee6') : '#0b1f1c'
        ctx.fillRect(c * 32 + 7, r * 40 + 8, 18, 24)
      }
    }
  })
  const material = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: '#ffffff',
    emissiveIntensity: 0.6,
    roughness: 0.8
  })
  const mesh = add(parent, new THREE.PlaneGeometry(w, h), material, [x, y + h / 2, z], [0, rotY])
  mesh.castShadow = false
  return mesh
}

// ---------- props ----------

export function tree(parent, [x, z], s = 1, color = palette.tealLight) {
  cyl(parent, [0.14 * s, 0.2 * s, 0.9 * s, 6], [x, 0, z], palette.wood)
  cone(parent, [0.95 * s, 1.7 * s, 7], [x, 0.7 * s, z], color)
  cone(parent, [0.7 * s, 1.3 * s, 7], [x, 1.6 * s, z], color)
}

export function bush(parent, [x, z], s = 1, color = palette.tealLight) {
  ball(parent, 0.55 * s, [x, -0.15 * s, z], color)
}

export function person(parent, [x, z], color = palette.slate, rotY = 0, s = 1) {
  const g = new THREE.Group()
  g.position.set(x, 0, z)
  g.rotation.y = rotY
  add(g, new THREE.CapsuleGeometry(0.28 * s, 0.6 * s, 3, 6), color, [0, 0.6 * s, 0])
  ball(g, 0.24 * s, [0, 1.12 * s, 0], palette.sand)
  parent.add(g)
  return g
}

export function lamp(parent, [x, z], glow) {
  cyl(parent, [0.07, 0.1, 3.1, 6], [x, 0, z], palette.steel)
  box(parent, [0.5, 0.12, 0.3], [x, 3.05, z], palette.steel)
  ball(parent, 0.16, [x, 2.85, z], glowMat(glow, 2.2))
  halo(parent, [x, 3, z], 2.4, glow, 0.5)
  lightPool(parent, [x, 0, z], 5, glow, 0.22)
}

// Low-poly car, nose pointing at +z. Wheels are exposed for spinning.
export function car(color = palette.gold, { lights = false } = {}) {
  const g = new THREE.Group()
  const body = mat(color)
  box(g, [1.8, 0.55, 3.8], [0, 0.32, 0], body)
  box(g, [1.6, 0.5, 2], [0, 0.87, -0.25], palette.cream)
  box(g, [1.64, 0.36, 1.2], [0, 0.93, 0.05], mat(palette.ink, { roughness: 0.2 }))
  box(g, [1.82, 0.12, 3.82], [0, 0.3, 0], palette.ink)
  const wheels = []
  for (const [wx, wz] of [
    [-0.9, 1.15],
    [0.9, 1.15],
    [-0.9, -1.2],
    [0.9, -1.2]
  ]) {
    const w = add(
      g,
      new THREE.CylinderGeometry(0.36, 0.36, 0.32, 10),
      palette.tire,
      [wx, 0.36, wz],
      [0, 0, Math.PI / 2]
    )
    wheels.push(w)
  }
  const head = glowMat(palette.cream, lights ? 2.4 : 0.6)
  box(g, [0.38, 0.16, 0.06], [-0.6, 0.55, 1.9], head)
  box(g, [0.38, 0.16, 0.06], [0.6, 0.55, 1.9], head)
  const tail = glowMat(palette.coral, lights ? 2 : 0.5)
  box(g, [0.42, 0.14, 0.06], [-0.6, 0.55, -1.9], tail)
  box(g, [0.42, 0.14, 0.06], [0.6, 0.55, -1.9], tail)
  if (lights) {
    halo(g, [-0.6, 0.62, 2.05], 1.1, palette.cream, 0.7)
    halo(g, [0.6, 0.62, 2.05], 1.1, palette.cream, 0.7)
    lightPool(g, [0, 0, 5], 7, palette.cream, 0.3)
  }
  g.userData.wheels = wheels
  return g
}
