import * as THREE from 'three'
import {
  palette,
  mat,
  glowMat,
  glassMat,
  box,
  cyl,
  add,
  ball,
  halo,
  dynamicGroup,
  canvasTexture,
  sign,
  tree,
  bush,
  person,
  car
} from '../kit'

// Auto2000 showroom — AI Product Owner. Gold glow: the AI virtual assistant
// hologram, live-chat bubbles over the floor, and the AI-generated key visual.
export default function showroom(island, { glow, label }) {
  // floor, walls, roof
  box(island, [11.6, 0.18, 14], [-3.2, 0, 0], palette.cream)
  box(island, [0.5, 4.6, 13.4], [-8.7, 0, 0], palette.inkSoft)
  box(island, [11.2, 4.6, 0.4], [-3.2, 0, -6.8], palette.inkSoft)
  // cutaway roof: only the back strip and a front fascia, so the floor stays visible
  box(island, [4.4, 0.5, 14.4], [-7, 4.6, 0], palette.cream)
  box(island, [4.5, 0.14, 14.5], [-7, 4.55, 0], palette.teal)
  box(island, [0.6, 0.55, 14.2], [2.5, 4.6, 0], palette.cream)
  box(island, [11.2, 0.4, 0.4], [-3.2, 4.6, 6.8], palette.cream)
  box(island, [11.2, 0.4, 0.4], [-3.2, 4.6, -6.8], palette.cream)
  for (const z of [-6.6, -2.2, 2.2, 6.6])
    cyl(island, [0.16, 0.16, 4.6, 6], [2.5, 0, z], palette.cream)
  box(island, [0.08, 4.4, 13.2], [2.45, 0.18, 0], glassMat())
  box(island, [11, 4.4, 0.08], [-3.2, 0.18, 6.75], glassMat())

  // display cars on turntables
  const turntables = []
  for (const [z, color] of [
    [-3.2, palette.cream],
    [3, palette.slate]
  ]) {
    const t = dynamicGroup(island, [-4.6, 0.18, z])
    cyl(t, [2.3, 2.3, 0.14, 16], [0, 0, 0], palette.ink)
    cyl(t, [2.36, 2.36, 0.06, 16], [0, 0.02, 0], glowMat(glow, 0.9))
    const c = car(color)
    c.position.y = 0.14
    t.add(c)
    turntables.push(t)
  }
  person(island, [-1.2, -0.6], palette.slate, 2.4)
  person(island, [-1.5, 4.8], palette.coral, -2)
  box(island, [1.6, 0.9, 0.7], [-7.4, 0.18, 4.6], palette.wood)

  // AI virtual assistant hologram
  const holo = dynamicGroup(island, [0.6, 0.18, 1.8])
  cyl(holo, [0.9, 1, 0.12, 14], [0, 0, 0], palette.ink)
  add(
    holo,
    new THREE.TorusGeometry(0.85, 0.05, 6, 24),
    glowMat(glow, 2),
    [0, 0.14, 0],
    [Math.PI / 2]
  )
  const figure = dynamicGroup(holo, [0, 0.4, 0])
  const holoMat = new THREE.MeshStandardMaterial({
    color: glow,
    emissive: glow,
    emissiveIntensity: 1.3,
    transparent: true,
    opacity: 0.55,
    flatShading: true,
    depthWrite: false
  })
  add(figure, new THREE.ConeGeometry(0.55, 1.5, 6), holoMat, [0, 0.75, 0])
  add(figure, new THREE.IcosahedronGeometry(0.36, 0), holoMat, [0, 1.85, 0])
  const wire = add(
    figure,
    new THREE.IcosahedronGeometry(0.52, 0),
    new THREE.MeshBasicMaterial({ color: glow, wireframe: true, transparent: true, opacity: 0.6 }),
    [0, 1.85, 0]
  )
  halo(holo, [0, 1.5, 0], 4, glow, 0.45)

  // live-chat bubbles hovering over the display cars
  const bubbles = []
  for (const [x, y, z, w] of [
    [-3.4, 3.1, -3.2, 1.5],
    [-3.6, 3.5, 3, 1.2],
    [-0.4, 3.4, 0.4, 1]
  ]) {
    const b = dynamicGroup(island, [x, y, z])
    box(b, [0.12, 0.62, w], [0, 0, 0], glowMat(glow, 1.4))
    for (let i = -1; i <= 1; i++) ball(b, 0.07, [0.08, 0.24, i * w * 0.22], palette.ink)
    b.userData.baseY = y
    bubbles.push(b)
  }

  // AI-generated key visual billboard
  const kv = dynamicGroup(island, [0.6, 0, -8.3])
  kv.rotation.y = Math.PI / 4
  cyl(kv, [0.1, 0.1, 3, 6], [-1.4, 0, 0], palette.steel)
  cyl(kv, [0.1, 0.1, 3, 6], [1.4, 0, 0], palette.steel)
  box(kv, [3.6, 2.2, 0.2], [0, 2.8, -0.1], palette.ink)
  const kvTex = canvasTexture(512, 320, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#f2b84f')
    g.addColorStop(1, '#c96f4a')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(10,46,41,0.85)'
    ctx.beginPath()
    ctx.roundRect(w * 0.16, h * 0.5, w * 0.68, h * 0.18, 30)
    ctx.roundRect(w * 0.3, h * 0.36, w * 0.36, h * 0.18, 30)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(w * 0.3, h * 0.7, h * 0.07, 0, Math.PI * 2)
    ctx.arc(w * 0.7, h * 0.7, h * 0.07, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#0a2e29'
    ctx.font = '700 42px Poppins, sans-serif'
    ctx.fillText('NEW', w * 0.08, h * 0.2)
    ctx.font = '600 22px Poppins, sans-serif'
    ctx.fillText('✦ AI-generated', w * 0.62, h * 0.9)
  })
  const kvFace = new THREE.Mesh(
    new THREE.PlaneGeometry(3.3, 1.95),
    new THREE.MeshBasicMaterial({ map: kvTex, toneMapped: false })
  )
  kvFace.position.set(0, 3.9, 0.02)
  kv.add(kvFace)
  halo(kv, [0, 3.9, 0.3], 5, glow, 0.25)

  sign(island, label, { pos: [2.8, 5.1, 0], width: 6.4, rotY: Math.PI / 2, glow })

  tree(island, [-6, 8.2], 1.1)
  tree(island, [-9.4, -4.8], 0.9)
  bush(island, [1.4, 7.6])
  bush(island, [-1.8, -8.6], 1.2, mat(palette.teal))

  return (time) => {
    turntables[0].rotation.y = time * 0.25
    turntables[1].rotation.y = -time * 0.2 + 1.4
    figure.position.y = 0.4 + Math.sin(time * 1.6) * 0.12
    figure.rotation.y = time * 0.8
    wire.rotation.x = time * 0.6
    bubbles.forEach((b, i) => {
      b.position.y = b.userData.baseY + Math.sin(time * 1.3 + i * 2) * 0.18
    })
  }
}
