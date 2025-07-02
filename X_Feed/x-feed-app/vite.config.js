import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    //proxy para evitar CORS al obtener info de API randomuser.me (esto se hace en tweetCardApi => getNemae())
    proxy: {
      '/randomuser': {
        target: 'https://randomuser.me',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/randomuser/, '')
      }
    }
  }
})
