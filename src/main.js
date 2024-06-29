import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMetaManager, defaultConfig } from 'vue-meta'
import { inject } from '@vercel/analytics'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
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
