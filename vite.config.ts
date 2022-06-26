import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sql2struct/',
  build: {
    outDir: 'dist/web'
  },
  plugins: [react()],
})
