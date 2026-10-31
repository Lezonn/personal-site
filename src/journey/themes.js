// The world's day look, built on the original site palette (cream + mist blue).
// Sky stops are mirrored by --c-sky-* in main.scss so the hero blends into the stage.
export const worldTheme = {
  sky: ['#7fb2cc', '#c3dbe4', '#f6f1e6'],
  fog: '#e9eee8',
  fogStop: [110, 340],
  fogHero: [320, 860],
  hemi: ['#ffffff', '#b8cbbf', 1.45],
  ambient: ['#ffffff', 0.3],
  sun: ['#fff3dc', 2.7],
  exposure: 0.98,
  grass: '#8cc1a2',
  rim: '#b5dcc4',
  rock: '#d6c4a0',
  rockDark: '#c2ae8a',
  asphalt: '#4d5856',
  edge: '#ffffff',
  // halos and light pools are additive and wash out by day
  glow: 0.35
}
