import * as THREE from 'three'
import {
  palette,
  mat,
  glowMat,
  box,
  cyl,
  halo,
  dynamicGroup,
  canvasTexture,
  facade,
  sign,
  tree,
  bush,
  person
} from '../kit'

// BINUS IT Division — full-stack developer on the BINUS Square portal.
// Mint glow (the code era): the ops portal screen, the blinking server rack,
// and the database stack being migrated.
export default function itDivision(island, { glow, label, brand }) {
  box(island, [11.6, 0.14, 14], [-3.2, 0, 0], mat('#3a4c49'))

  // residence tower (BINUS Square)
  box(island, [4.4, 10, 4.4], [-6.2, 0.14, -3.6], mat('#163f39'))
  box(island, [4.8, 0.4, 4.8], [-6.2, 10.14, -3.6], palette.cream)
  box(island, [1.2, 1, 1.2], [-7, 10.54, -4.4], palette.steel)
  facade(island, [4, 9.2], [-3.98, 0.6, -3.6], Math.PI / 2, { cols: 5, rows: 12, seed: 3 })
  facade(island, [4, 9.2], [-6.2, 0.6, -1.38], 0, { cols: 5, rows: 12, seed: 7, lit: 0.45 })

  // office block with the ops portal
  box(island, [4.6, 3.6, 5], [-5.9, 0.14, 3.6], mat('#22524a'))
  box(island, [5, 0.3, 5.4], [-5.9, 3.74, 3.6], palette.cream)
  facade(island, [4.6, 2.6], [-5.9, 0.6, 6.12], 0, { cols: 6, rows: 3, seed: 11, lit: 0.7 })
  const portal = canvasTexture(384, 240, (ctx, w, h) => {
    ctx.fillStyle = '#0b2925'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#7fdcc4'
    ctx.fillRect(0, 0, w, 34)
    ctx.fillStyle = '#0b2925'
    ctx.font = '700 20px Poppins, sans-serif'
    ctx.fillText('OPS PORTAL', 14, 24)
    for (let r = 0; r < 5; r++) {
      ctx.fillStyle = r % 2 ? '#123a34' : '#174640'
      ctx.fillRect(14, 48 + r * 34, w - 28, 28)
      ctx.fillStyle = '#b9cdc4'
      ctx.fillRect(24, 58 + r * 34, 120, 8)
      ctx.fillStyle = r === 1 ? '#e8b04b' : '#7fdcc4'
      ctx.fillRect(w - 80, 56 + r * 34, 46, 12)
    }
  })
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 2.1),
    new THREE.MeshBasicMaterial({ map: portal, toneMapped: false })
  )
  screen.position.set(-3.56, 1.9, 3.6)
  screen.rotation.y = Math.PI / 2
  screen.userData.dynamic = true
  island.add(screen)
  halo(island, [-3.2, 1.9, 3.6], 5, glow, 0.25)

  // server rack with blinking LEDs
  box(island, [1.3, 2.6, 1], [-0.9, 0.14, -5.2], palette.ink)
  for (let i = 0; i < 6; i++)
    box(island, [0.06, 0.04, 0.8], [-0.24, 0.5 + i * 0.36, -5.2], palette.steel)
  const leds = []
  const ledOn = glowMat(glow, 2.4)
  for (let i = 0; i < 12; i++) {
    const led = dynamicGroup(island, [
      -0.22,
      0.42 + Math.floor(i / 2) * 0.36,
      -5.5 + (i % 2) * 0.22
    ])
    box(led, [0.05, 0.07, 0.07], [0, 0, 0], ledOn)
    leds.push(led)
  }
  halo(island, [-0.4, 1.6, -5.2], 3, glow, 0.25)

  // database stack mid-migration
  const db = dynamicGroup(island, [-0.6, 3.4, 0.6])
  for (let i = 0; i < 3; i++) {
    cyl(db, [0.7, 0.7, 0.42, 14], [0, i * 0.52, 0], i === 2 ? glowMat(glow, 1.6) : palette.cream)
    cyl(db, [0.72, 0.72, 0.06, 14], [0, i * 0.52 + 0.42, 0], glowMat(glow, 1.2))
  }
  const rows = []
  for (let i = 0; i < 5; i++) {
    const r = dynamicGroup(island, [0, 0, 0])
    box(r, [0.5, 0.12, 0.3], [0, 0, 0], glowMat(glow, 1.8))
    r.userData.offset = i / 5
    rows.push(r)
  }
  halo(db, [0, 0.8, 0], 4, glow, 0.3)

  person(island, [-2, -1.2], palette.slate, 2)
  person(island, [-1, 6.4], palette.coral, -2.4)
  box(island, [0.6, 0.12, 2], [1.4, 0.5, 6.2], palette.wood)
  sign(island, label, { pos: [-3.25, 3.95, 3.6], width: 4.2, rotY: Math.PI / 2, glow, brand })

  tree(island, [-9.6, 1.6], 0.9)
  tree(island, [1.4, -8.4], 1)
  bush(island, [-2.4, 8.6], 1.1)

  return (time) => {
    leds.forEach((led, i) => {
      led.visible = Math.sin(time * (3 + (i % 5)) + i * 1.7) > -0.2
    })
    db.position.y = 3.4 + Math.sin(time * 1.2) * 0.15
    // records flowing from the old store (rack) into the new database
    rows.forEach((r) => {
      const t = (time * 0.35 + r.userData.offset) % 1
      r.position.set(-0.9 + t * 0.3, 2.9 + t * 1.6, -5.2 + t * 5.8)
      r.visible = t > 0.05 && t < 0.92
    })
  }
}
