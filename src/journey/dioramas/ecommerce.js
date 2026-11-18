import * as THREE from 'three'
import {
  palette,
  mat,
  glowMat,
  box,
  cyl,
  add,
  halo,
  dynamicGroup,
  canvasTexture,
  sign,
  tree,
  bush,
  person,
  car
} from '../kit'

// Blibli — e-commerce engineering. Mint glow (the code era): the storefront
// with its search bar (SEO), the search lens, and the microservice nodes.
export default function ecommerce(island, { glow, label, brand }) {
  // fulfilment warehouse
  box(island, [11, 0.14, 13.4], [-3.4, 0, -0.2], mat('#3a4c49'))
  box(island, [5.2, 3.8, 8.6], [-5.8, 0.14, -2.2], mat('#2b6358'))
  for (const side of [-1, 1]) {
    box(island, [3, 0.3, 9], [-5.8 + side * 1.35, 4.25, -2.2], palette.cream, [0, 0, side * -0.36])
  }
  box(island, [0.12, 2.8, 3.4], [-3.18, 0.14, -2.4], palette.slate)
  for (let i = 0; i < 7; i++)
    box(island, [0.14, 0.04, 3.4], [-3.14, 0.4 + i * 0.36, -2.4], palette.ink)

  // conveyor out of the warehouse
  box(island, [5.2, 0.22, 1.3], [-0.6, 0.85, -2.4], palette.ink)
  for (const x of [-2.8, -0.6, 1.6]) {
    for (const z of [-2.95, -1.85]) box(island, [0.14, 0.85, 0.14], [x, 0.14, z], palette.steel)
  }
  const parcels = []
  for (let i = 0; i < 4; i++) {
    const p = dynamicGroup(island, [0, 1.07, -2.4])
    box(p, [0.8, 0.6, 0.8], [0, 0, 0], palette.sand)
    box(p, [0.82, 0.08, 0.2], [0, 0.4, 0], palette.wood)
    p.userData.offset = i / 4
    parcels.push(p)
  }

  // parcel stacks + delivery van
  for (const [x, z, n] of [
    [-8.2, 4.6, 3],
    [-7, 4.9, 2],
    [-2.4, 5.6, 2]
  ]) {
    box(island, [1.3, 0.2, 1.3], [x, 0.14, z], palette.wood)
    for (let i = 0; i < n; i++) box(island, [0.9, 0.62, 0.9], [x, 0.34 + i * 0.62, z], palette.sand)
  }
  const van = car(palette.cream)
  box(van, [1.7, 0.9, 2.6], [0, 0.6, -0.5], palette.cream)
  box(van, [1.72, 0.2, 2.62], [0, 1.2, -0.5], mat(glow))
  van.position.set(0.6, 0.14, 4.2)
  island.add(van)
  person(island, [-1.4, 3], palette.coral, 0.8)

  // giant storefront phone with a search bar (SEO)
  const phone = dynamicGroup(island, [-1.6, 0.14, -6.9])
  phone.rotation.y = Math.PI / 5
  box(phone, [2.6, 4.6, 0.32], [0, 0.2, 0], palette.ink)
  const screen = canvasTexture(256, 448, (ctx, w, h) => {
    ctx.fillStyle = '#0b2925'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#f2ecdd'
    ctx.beginPath()
    ctx.roundRect(18, 26, w - 36, 42, 21)
    ctx.fill()
    ctx.fillStyle = '#5b6f6c'
    ctx.font = '600 18px Poppins, sans-serif'
    ctx.fillText('Search products…', 50, 53)
    ctx.strokeStyle = '#7fdcc4'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(32, 46, 7, 0, Math.PI * 2)
    ctx.stroke()
    const colors = ['#e8b04b', '#c96f4a', '#7a9ba8', '#7fdcc4', '#f2ecdd', '#1f7a6a']
    for (let i = 0; i < 6; i++) {
      const x = 18 + (i % 2) * 116
      const y = 90 + Math.floor(i / 2) * 116
      ctx.fillStyle = '#123a34'
      ctx.fillRect(x, y, 104, 104)
      ctx.fillStyle = colors[i]
      ctx.fillRect(x + 24, y + 16, 56, 50)
      ctx.fillStyle = '#b9cdc4'
      ctx.fillRect(x + 12, y + 76, 70, 8)
    }
  })
  const screenFace = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 4.05),
    new THREE.MeshBasicMaterial({ map: screen, toneMapped: false })
  )
  screenFace.position.set(0, 2.5, 0.17)
  phone.add(screenFace)
  halo(phone, [0, 2.6, 0.6], 6, glow, 0.25)

  // search lens
  const lens = dynamicGroup(island, [0.6, 4.6, -5.6])
  lens.rotation.y = Math.PI / 4
  add(lens, new THREE.TorusGeometry(0.62, 0.13, 6, 18), glowMat(glow, 2), [0, 0, 0])
  cyl(lens, [0.12, 0.12, 0.9, 6], [0.62, -1.15, 0], glowMat(glow, 2), [0, 0, 0.7])
  halo(lens, [0, 0, 0], 3, glow, 0.35)

  // microservice nodes orbiting over the roof
  const services = dynamicGroup(island, [-5.8, 6.4, -2.2])
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    box(services, [0.5, 0.5, 0.5], [Math.cos(a) * 1.8, 0, Math.sin(a) * 1.8], glowMat(glow, 1.6))
  }
  box(services, [0.6, 0.6, 0.6], [0, 0.2, 0], palette.cream)
  halo(services, [0, 0.4, 0], 6, glow, 0.25)

  sign(island, label, { pos: [-3.05, 3.6, 2.6], width: 5, rotY: Math.PI / 2, glow, brand })

  tree(island, [-8.8, -7], 0.9)
  tree(island, [-4.6, 8.4], 1)
  bush(island, [1.8, -8.6], 1.1)

  return (time) => {
    parcels.forEach((p) => {
      const t = (time * 0.18 + p.userData.offset) % 1
      p.position.x = -3 + t * 4.6
      p.visible = t < 0.97
    })
    lens.position.y = 4.6 + Math.sin(time * 1.4) * 0.2
    lens.rotation.z = Math.sin(time * 0.8) * 0.2
    services.rotation.y = time * 0.6
  }
}
