import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Add a dev proxy so frontend can call `/api/*` and be forwarded to the backend
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // proxy any request starting with /api to the backend on port 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
