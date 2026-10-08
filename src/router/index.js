import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  // No `window` during the build-time prerender
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
