// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
//   // server: { port: 5173 },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- ADD THIS LINE

export default defineConfig({
  plugins: [
    tailwindcss(), // <-- ADD THIS PLUGIN CALL
    react(), 
  ],
  build: {
    outDir: 'build',
  },
});