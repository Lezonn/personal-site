import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMetaManager, defaultConfig } from 'vue-meta'
import { inject } from '@vercel/analytics'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const metaManager = createMetaManager(false, {
  ...defaultConfig,
  meta: { tag: 'meta', nameless: true }
})

app.use(createPinia())
app.use(metaManager)
app.use(router)

app.mount('#app')

inject()
