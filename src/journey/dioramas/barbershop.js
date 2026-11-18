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
  person
} from '../kit'

// The Men's Barbershop — IT Solution Consultant. Gold glow: the POS tablet,
// the auto-generated daily report, and the digital membership card.
export default function barbershop(island, { glow, label, brand }) {
  // checkered floor
  const tiles = canvasTexture(256, 256, (ctx) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        ctx.fillStyle = (r + c) % 2 ? '#e9e1cc' : '#1b2b29'
        ctx.fillRect(c * 32, r * 32, 32, 32)
      }
    }
  })
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(8.2, 0.16, 11),
    new THREE.MeshStandardMaterial({ map: tiles, roughness: 0.6 })
  )
  floor.position.set(-4.7, 0.08, 0)
  floor.receiveShadow = true
  island.add(floor)

  const wall = mat('#c9b99a')
  box(island, [0.4, 3.6, 11], [-8.7, 0.16, 0], wall)
  box(island, [8.2, 3.6, 0.35], [-4.7, 0.16, -5.4], wall)
  box(island, [3.6, 0.45, 11.4], [-7.1, 3.76, 0], palette.inkSoft)
  box(island, [0.5, 0.6, 11.4], [-0.55, 3.6, 0], palette.cream)
  for (const z of [-5.4, 5.4]) cyl(island, [0.14, 0.14, 3.6, 6], [-0.55, 0.16, z], palette.cream)
  box(island, [0.06, 3.3, 10.6], [-0.6, 0.16, 0], glassMat(palette.glass, 0.16))

  // striped awning over the shop front
  for (let i = 0; i < 9; i++) {
    box(
      island,
      [1.1, 0.12, 1.26],
      [0.05, 3.35, -5.05 + i * 1.26],
      i % 2 ? palette.cream : palette.coral,
      [0, 0, -0.42]
    )
  }

  // mirrors + chairs + people
  for (const z of [-2.6, 1.6]) {
    box(island, [0.08, 1.8, 1.8], [-8.45, 1.3, z], glassMat('#d9f0ea', 0.55))
    box(island, [0.12, 1.96, 1.96], [-8.5, 1.22, z], palette.wood)
    cyl(island, [0.22, 0.4, 0.5, 8], [-6.6, 0.16, z], palette.steel)
    box(island, [1.1, 0.35, 1], [-6.6, 0.66, z], palette.coral)
    box(island, [0.25, 1.1, 1], [-6.05, 0.66, z], palette.coral)
  }
  person(island, [-6.55, -2.6], palette.cream, -Math.PI / 2, 0.85).position.y = 0.55
  person(island, [-5.3, -1.3], palette.ink, -1.2)
  person(island, [-3.4, 4.1], palette.slate, -2.6)
  box(island, [1.8, 0.45, 0.6], [-6.4, 0.16, 4.6], palette.wood)

  // counter with the POS tablet
  box(island, [1.2, 1.1, 2.6], [-2.6, 0.16, 3.4], palette.wood)
  box(island, [1.3, 0.08, 2.7], [-2.6, 1.26, 3.4], palette.cream)
  box(island, [0.5, 0.06, 0.7], [-2.6, 1.34, 3.1], glowMat(glow, 1.6), [0, 0, -0.5])
  halo(island, [-2.5, 1.6, 3.1], 2, glow, 0.5)

  // auto-generated daily report, hovering over the counter
  const report = dynamicGroup(island, [-2.4, 3.1, 3.2])
  report.rotation.y = Math.PI / 4
  box(report, [1.7, 1.2, 0.06], [0, 0, 0], palette.ink)
  for (const [x, h] of [
    [-0.5, 0.35],
    [-0.15, 0.6],
    [0.2, 0.45],
    [0.55, 0.85]
  ]) {
    box(report, [0.22, h, 0.08], [x, 0.12, 0.04], glowMat(glow, 1.6))
  }
  halo(report, [0, 0.6, 0.2], 3, glow, 0.25)

  // digital membership card
  const card = dynamicGroup(island, [-4.2, 2.6, -0.6])
  box(card, [1.3, 0.8, 0.06], [0, -0.4, 0], glowMat(glow, 1.1))
  box(card, [1.3, 0.14, 0.07], [0, 0.12, 0.01], palette.ink)
  halo(card, [0, 0, 0], 2.2, glow, 0.3)

  // barber pole
  const stripes = canvasTexture(64, 256, (ctx, w, h) => {
    ctx.fillStyle = '#f2ecdd'
    ctx.fillRect(0, 0, w, h)
    ctx.lineWidth = 22
    for (let y = -h; y < h * 2; y += 64) {
      ctx.strokeStyle = (y / 64) % 2 ? '#c96f4a' : '#075a4e'
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y + 64)
      ctx.stroke()
    }
  })
  stripes.wrapS = stripes.wrapT = THREE.RepeatWrapping
  const pole = dynamicGroup(island, [0.9, 0, -4.4])
  cyl(pole, [0.24, 0.3, 0.3, 10], [0, 0, 0], palette.steel)
  add(
    pole,
    new THREE.CylinderGeometry(0.2, 0.2, 1.8, 16, 1, true),
    new THREE.MeshStandardMaterial({
      map: stripes,
      emissiveMap: stripes,
      emissive: '#ffffff',
      emissiveIntensity: 0.35
    }),
    [0, 1.2, 0]
  )
  box(pole, [0.06, 1.8, 0.06], [0.22, 0.3, 0], glassMat('#ffffff', 0.3))
  ball(pole, 0.26, [0, 2.05, 0], palette.cream)

  sign(island, label, { pos: [-0.2, 4.15, 0], width: 4.6, rotY: Math.PI / 2, glow, brand })

  // sidewalk bench + greenery
  box(island, [0.7, 0.12, 2.2], [1.6, 0.55, 2.4], palette.wood)
  for (const z of [1.5, 3.3]) box(island, [0.6, 0.55, 0.12], [1.6, 0, z], palette.steel)
  tree(island, [-3, 8], 1.1)
  tree(island, [-8.4, 6.8], 0.8)
  bush(island, [1.6, -7.4], 1.1)
  bush(island, [-9.8, -3.6], 1, mat(palette.teal))

  return (time) => {
    stripes.offset.y = -time * 0.35
    report.position.y = 3.1 + Math.sin(time * 1.2) * 0.15
    card.rotation.y = time * 0.9
    card.position.y = 2.6 + Math.sin(time * 1.5 + 1) * 0.12
  }
}
