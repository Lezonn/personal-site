import { renderToString } from 'vue/server-renderer'

import { createApp } from './app'

// Used only at build time by scripts/prerender.js
export async function render() {
  const { app } = createApp()
  return renderToString(app)
}
