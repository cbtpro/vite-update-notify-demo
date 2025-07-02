import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import generateVersionPlugin from './plugins/version-generator';


const serverOptions: ServerOptions = {
  host: true,
  proxy: {
    '/gateway': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/gateway/, ''),
      configure: (proxy, options) => {
        // proxy 是 'http-proxy' 的实例
      },
    },
    '/socket.io': {
      target: 'ws://localhost:5174',
      ws: true,
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: serverOptions,
  plugins: [
    vue(),
    generateVersionPlugin()
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary-color': '#1890ff',
        },
        javascriptEnabled: true,
      },
    },
  },
});