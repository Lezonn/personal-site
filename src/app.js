import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createMetaManager, defaultConfig } from 'vue-meta'

import App from './App.vue'
import router from './router'

// Vuetify — import only the components actually used (tree-shaken)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VBtn, VContainer, VRow, VCol } from 'vuetify/components'

// Shared by the browser entry (main.js) and the build-time prerender (entry-server.js),
// so the server-rendered HTML and the hydrated app always match.
export function createApp() {
  const vuetify = createVuetify({
    ssr: import.meta.env.SSR,
    components: { VBtn, VContainer, VRow, VCol }
  })

  const app = createSSRApp(App)
  const metaManager = createMetaManager(import.meta.env.SSR, {
    ...defaultConfig,
    meta: { tag: 'meta', nameless: true }
  })

  app.use(createPinia())
  app.use(metaManager)
  app.use(router)
  app.use(vuetify)

  return { app }
}
