// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@store': '/src/store',
      '@assets': '/src/assets',
      '@services': '/src/services',
      '@pages': '/src/pages',     
      '@routes': '/src/routes',
      // Add more aliases as needed
    },
  },
});