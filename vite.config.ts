import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
    ]
  },
  server: {
    host:'localhost',
    port: 8080,
    proxy: {
      '/api': {
          target: 'http://114.116.203.165/api',
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
