import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    proxy: {
      '/games': 'https://fastapi-app-production-f08f.up.railway.app/games' // Proxy para producción
    }
  }
})
