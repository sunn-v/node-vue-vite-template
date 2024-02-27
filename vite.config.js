import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: "./client/",
  build: {
    outDir: path.join(__dirname, 'dist'),
    manifest: true,
    rollupOptions: {
      input: './client/src/main.js'
    }
  },
  server: {
    origin: 'http://localhost:3000',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: false,
      }
    }
  }
})
