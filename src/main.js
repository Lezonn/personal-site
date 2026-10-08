import { inject } from '@vercel/analytics'

import { createApp } from './app'

// Hydrates the HTML that scripts/prerender.js rendered into index.html at build time
const { app } = createApp()

app.mount('#app')

inject()
