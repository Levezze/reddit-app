import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
