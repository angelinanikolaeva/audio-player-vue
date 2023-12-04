import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(), svgLoader()],
  build: {
    outDir: 'build',
  },
  server: { port: 3001 },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
