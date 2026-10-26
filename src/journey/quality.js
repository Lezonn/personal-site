// Picks how much 3D a visitor gets:
//   'high'   — desktop: antialiasing, shadows, up to 2x pixel ratio
//   'lite'   — phones/tablets and modest hardware: no shadows, 1.25x pixel ratio
//   'static' — no WebGL, reduced motion, data saver, or very weak devices: 2D timeline
// `?static` and `?lite` in the URL force a tier (handy for testing).

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

export function detectTier() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('static')) return 'static'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static'
  if (navigator.connection?.saveData) return 'static'
  const memory = navigator.deviceMemory
  const cores = navigator.hardwareConcurrency
  if ((memory && memory < 2) || (cores && cores <= 2)) return 'static'
  if (!hasWebGL()) return 'static'
  const touch = window.matchMedia('(pointer: coarse)').matches
  if (params.has('lite') || touch || window.innerWidth < 900 || (memory && memory <= 4)) {
    return 'lite'
  }
  return 'high'
}
