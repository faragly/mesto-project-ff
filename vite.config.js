import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/mesto-project-ff/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'),
    },
  },
});
