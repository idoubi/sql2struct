import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let outDir = 'dist/web'
  let plugins = [react()]

  if (mode === 'chrome') {
    outDir = 'dist/chrome'
    plugins.push(viteStaticCopy({
      targets: [
        {
          src: 'src/chrome/*',
          dest: ''
        }
      ]
    }))
  }

  return {
    build: {
      outDir: outDir
    },
    plugins: [
      react(),
      plugins,
    ],
  }
})
