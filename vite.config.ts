import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
       // 将 /socket.io 的请求代理到目标服务器 (后端服务器地址)
       '/socket.io': {
        target: 'http://localhost:3000', // 目标服务器地址，后端 Socket.IO 服务器所在端口
        ws: true,  // 启用 WebSocket 代理
        changeOrigin: true
      }
    },
  },
})
