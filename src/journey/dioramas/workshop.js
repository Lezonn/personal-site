import * as THREE from 'three'
import {
  palette,
  mat,
  glowMat,
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

// Auto2000 workshop — Management Trainee. Gold glow: the RPA robot arm, the
// spinning automation gear, and the board showing the 68% workload cut.
export default function workshop(island, { glow, label }) {
  const concrete = mat('#40524f')
  box(island, [11.6, 0.16, 14], [-3.2, 0, 0], concrete)
  for (const z of [-4.4, 0, 4.4]) box(island, [11.4, 0.02, 0.12], [-3.2, 0.16, z], palette.gold)
  box(island, [0.5, 4.2, 13.4], [-8.7, 0, 0], palette.inkSoft)
  box(island, [11.2, 4.2, 0.4], [-3.2, 0, -6.8], palette.inkSoft)
  box(island, [4.4, 0.5, 14.4], [-7, 4.2, 0], palette.teal)
  box(island, [0.6, 0.55, 14.2], [2.5, 4.2, 0], palette.cream)
  box(island, [11.2, 0.4, 0.4], [-3.2, 4.2, -6.8], palette.cream)
  for (const z of [-6.6, 6.6]) cyl(island, [0.18, 0.18, 4.2, 6], [2.5, 0, z], palette.cream)

  // car lift with a car up on it
  for (const x of [-6, -3.2]) box(island, [0.4, 3.4, 0.4], [x, 0.16, -2.6], palette.coral)
  box(island, [3.2, 0.14, 0.5], [-4.6, 1.75, -3.8], palette.steel)
  box(island, [3.2, 0.14, 0.5], [-4.6, 1.75, -1.4], palette.steel)
  const lifted = car(palette.slate)
  lifted.position.set(-4.6, 1.85, -2.6)
  island.add(lifted)
  person(island, [-2.1, -0.2], palette.coral, 2.8)

  // tool cabinet + tyres
  box(island, [0.9, 1.7, 2.2], [-8, 0.16, 3.6], palette.coral)
  for (let i = 0; i < 4; i++)
    box(island, [0.04, 0.05, 1.9], [-7.53, 0.5 + i * 0.36, 3.6], palette.ink)
  for (let i = 0; i < 3; i++) {
    cyl(island, [0.48, 0.48, 0.3, 10], [-1.2, 0.16 + i * 0.32, 5.4], palette.tire)
  }
  cyl(island, [0.48, 0.48, 0.3, 10], [-2.3, 0.16, 5.7], palette.tire)

  // process board on the back wall: before/after bars
  const board = canvasTexture(512, 300, (ctx, w, h) => {
    ctx.fillStyle = '#0b2925'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#b9cdc4'
    ctx.font = '600 26px Poppins, sans-serif'
    ctx.fillText('Workload / month', 28, 44)
    ctx.fillStyle = '#5b6f6c'
    ctx.fillRect(40, 80, 150, 180)
    ctx.fillStyle = '#f2b84f'
    ctx.fillRect(250, 80 + 180 * 0.68, 150, 180 * 0.32)
    ctx.font = '700 54px Poppins, sans-serif'
    ctx.fillText('−68%', 250, 150)
  })
  const boardFace = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 2.35),
    new THREE.MeshBasicMaterial({ map: board, toneMapped: false })
  )
  boardFace.position.set(-8.42, 2.5, 2.4)
  boardFace.rotation.y = Math.PI / 2
  boardFace.userData.dynamic = true
  island.add(boardFace)

  // RPA robot arm
  const arm = dynamicGroup(island, [-1.2, 0.16, 2.2])
  const gold = glowMat(glow, 0.7)
  cyl(arm, [0.6, 0.7, 0.35, 10], [0, 0, 0], palette.ink)
  add(
    arm,
    new THREE.TorusGeometry(0.62, 0.05, 6, 20),
    glowMat(glow, 2),
    [0, 0.36, 0],
    [Math.PI / 2]
  )
  const turret = dynamicGroup(arm, [0, 0.35, 0])
  cyl(turret, [0.35, 0.4, 0.5, 8], [0, 0, 0], gold)
  const upper = dynamicGroup(turret, [0, 0.5, 0])
  box(upper, [0.32, 1.7, 0.32], [0, 0, 0], palette.cream)
  ball(upper, 0.24, [0, 1.5, 0], gold)
  const fore = dynamicGroup(upper, [0, 1.72, 0])
  box(fore, [0.26, 1.3, 0.26], [0, 0, 0], palette.cream)
  const grip = dynamicGroup(fore, [0, 1.3, 0])
  box(grip, [0.5, 0.16, 0.2], [0, 0, 0], gold)
  box(grip, [0.08, 0.36, 0.18], [-0.2, 0.12, 0], gold)
  box(grip, [0.08, 0.36, 0.18], [0.2, 0.12, 0], gold)
  halo(arm, [0, 2.4, 0], 3.6, glow, 0.3)

  // automation gear floating above the bay
  const gear = dynamicGroup(island, [-4.6, 5.6, 2.6])
  gear.rotation.y = Math.PI / 4
  add(gear, new THREE.TorusGeometry(0.7, 0.2, 6, 14), glowMat(glow, 1.8), [0, 0, 0])
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    box(
      gear,
      [0.3, 0.3, 0.26],
      [Math.cos(a) * 0.98, Math.sin(a) * 0.98 - 0.15, 0],
      glowMat(glow, 1.8),
      [0, 0, a]
    )
  }
  halo(gear, [0, 0, 0], 4, glow, 0.35)

  sign(island, label, { pos: [2.85, 4.75, 0], width: 6.4, rotY: Math.PI / 2, glow })

  tree(island, [-6.4, 8], 1)
  tree(island, [-9.4, 4.8], 0.8)
  bush(island, [1.2, 7.8])
  bush(island, [-0.6, -8.4], 1.1, mat(palette.teal))

  return (time) => {
    turret.rotation.y = Math.sin(time * 0.7) * 1.1
    upper.rotation.z = -0.35 + Math.sin(time * 1.1) * 0.25
    fore.rotation.z = -0.9 + Math.sin(time * 1.1 + 1) * 0.35
    grip.rotation.y = time * 1.5
    gear.rotation.z = time * 0.9
    gear.position.y = 5.6 + Math.sin(time * 1.2) * 0.15
  }
}
