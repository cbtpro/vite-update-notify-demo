import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import generateVersionPlugin from './plugins/version-generator';


// https://vitejs.dev/config/
export default defineConfig({
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