import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': `http://${process.env.onDocker? 'backend' : '0.0.0.0'}:3001/`
    },

    host: true,
    strictPort: true,
    port: 9005
  }
  
})
