import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // three.js lives in the lazy-loaded journey chunk (~145 kB gzip), never on the critical path
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(@vue|vue|vue-router|pinia)\//.test(id)) return 'vue'
        }
      }
    }
  }
})
