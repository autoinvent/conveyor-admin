import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vitejs/vite/pull/8090
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'conveyor-admin',
      fileName: 'conveyor-admin',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
