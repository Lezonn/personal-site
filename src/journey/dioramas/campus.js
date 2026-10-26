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
  sign,
  tree,
  bush,
  person
} from '../kit'

// BINUS University — where the ride started. Mint glow (the code era): the
// floating graduation cap and the VR headset from the metaverse paper.
export default function campus(island, { glow, label }) {
  const stone = mat('#e3dac4')
  box(island, [11.4, 0.14, 14], [-3.4, 0, 0], mat('#3f514e'))

  // classical hall facing the road
  for (let i = 0; i < 3; i++) {
    box(island, [7.2 - i * 0.6, 0.3, 11 - i * 0.6], [-5 - i * 0.3, 0.14 + i * 0.3, 0], stone)
  }
  box(island, [4.2, 4.2, 9.2], [-6.6, 1.04, 0], mat('#c9bfa6'))
  for (const z of [-3.8, -1.9, 0, 1.9, 3.8]) {
    cyl(island, [0.32, 0.36, 3.6, 10], [-3.1, 1.04, z], palette.cream)
  }
  box(island, [5.6, 0.6, 10], [-5.4, 4.64, 0], stone)
  const pediment = new THREE.Shape()
  pediment.moveTo(-5, 0)
  pediment.lineTo(5, 0)
  pediment.lineTo(0, 1.8)
  pediment.closePath()
  add(
    island,
    new THREE.ExtrudeGeometry(pediment, { depth: 5.2, bevelEnabled: false }),
    palette.cream,
    [-8.2, 5.24, 0],
    [0, Math.PI / 2]
  )
  box(island, [0.1, 2.2, 1.6], [-4.48, 1.04, 0], palette.inkSoft)
  box(island, [0.12, 0.5, 0.5], [-2.85, 5.6, 0], glowMat(glow, 1.4))

  // books + students
  let stack = 0.14
  for (const [h, c, r] of [
    [0.3, palette.coral, 0],
    [0.26, palette.teal, 0.2],
    [0.32, palette.gold, -0.15],
    [0.24, palette.slate, 0.35]
  ]) {
    box(island, [1.4, h, 1], [0.4, stack, 5.2], c, [0, r, 0])
    stack += h
  }
  person(island, [-0.6, -3], palette.slate, 1.8)
  person(island, [0.1, -1.6], palette.coral, -2.6)
  person(island, [-1.2, 3.4], palette.teal, 2.2)

  // floating graduation cap
  const cap = dynamicGroup(island, [-0.8, 4.2, -4.6])
  cyl(cap, [0.55, 0.62, 0.5, 10], [0, 0, 0], palette.ink)
  box(cap, [1.9, 0.12, 1.9], [0, 0.5, 0], palette.ink)
  ball(cap, 0.1, [0, 0.6, 0], glowMat(glow, 2))
  box(cap, [0.05, 0.05, 0.9], [0, 0.66, 0.45], glowMat(glow, 2))
  box(cap, [0.07, 0.6, 0.07], [0, 0.1, 0.92], glowMat(glow, 2))
  halo(cap, [0, 0.4, 0], 3.6, glow, 0.35)

  // VR headset — "Metaverse as A Future of Education"
  const vr = dynamicGroup(island, [-1.2, 3.6, 2.6])
  vr.rotation.y = Math.PI / 3
  box(vr, [1.4, 0.7, 0.8], [0, 0, 0], palette.ink)
  box(vr, [1.2, 0.46, 0.06], [0, 0.12, 0.42], glowMat(glow, 2.2))
  add(vr, new THREE.TorusGeometry(0.62, 0.06, 6, 16), palette.steel, [0, 0.35, -0.3], [Math.PI / 2])
  halo(vr, [0, 0.35, 0.6], 3.2, glow, 0.35)
  const orbit = []
  for (let i = 0; i < 3; i++) {
    const o = dynamicGroup(vr, [0, 0.35, 0])
    add(o, new THREE.OctahedronGeometry(0.16), glowMat(glow, 2), [1.2, 0, 0])
    o.rotation.y = (i / 3) * Math.PI * 2
    orbit.push(o)
  }

  sign(island, label, { pos: [-2.75, 6.25, 0], width: 3.8, height: 0.85, rotY: Math.PI / 2, glow })

  tree(island, [-6, 7.8], 1.1)
  tree(island, [-6.4, -7.6], 1)
  tree(island, [-9.8, 3.2], 0.8)
  bush(island, [1.6, 7.8], 1.1)
  bush(island, [1.2, -7.8])

  // road's end: the start line of the whole ride
  const flag = dynamicGroup(island, [2.8, 0, -8.2])
  cyl(flag, [0.06, 0.08, 3.2, 6], [0, 0, 0], palette.cream)
  const cloth = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.9, 6, 1),
    new THREE.MeshStandardMaterial({
      color: glow,
      emissive: glow,
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide
    })
  )
  cloth.position.set(0.7, 2.75, 0)
  flag.add(cloth)
  const clothBase = cloth.geometry.attributes.position.array.slice()

  return (time) => {
    cap.rotation.y = time * 0.5
    cap.position.y = 4.2 + Math.sin(time * 1.1) * 0.2
    vr.position.y = 3.6 + Math.sin(time * 1.3 + 2) * 0.15
    orbit.forEach((o, i) => (o.rotation.y = time * 1.2 + (i / 3) * Math.PI * 2))
    const pos = cloth.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = clothBase[i * 3]
      pos.array[i * 3 + 2] = Math.sin(time * 3 + x * 3) * 0.12 * (x + 0.7)
    }
    pos.needsUpdate = true
  }
}
