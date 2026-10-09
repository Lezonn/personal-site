import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMetaManager, defaultConfig } from 'vue-meta'
import { inject } from '@vercel/analytics'

import App from './App.vue'
import router from './router'

// Vuetify — import only the components actually used (tree-shaken)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VBtn, VContainer, VRow, VCol } from 'vuetify/components'

const vuetify = createVuetify({
  components: { VBtn, VContainer, VRow, VCol }
})

const app = createApp(App)
const metaManager = createMetaManager(false, {
  ...defaultConfig,
  meta: { tag: 'meta', nameless: true }
})

app.use(createPinia())
app.use(metaManager)
app.use(router)
app.use(vuetify)

app.mount('#app')

inject()
