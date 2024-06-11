// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': {},
//   },
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "theme_color": "#ffffff",
        "background_color": "#000000",
        "orientation": "any",
        "display": "standalone",
        "dir": "auto",
        "lang": "en-US",
        "name": "mule foods",
        "short_name": "mule foods app",
        "icons": [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "logo192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "logo512.png",
            "type": "image/png",
            "sizes": "512x512"
          },
          {
            "src": "logo256.png",
            "type": "image/png",
            "sizes": "256x256"
          },
          {
            "src": "logo384.png",
            "type": "image/png",
            "sizes": "384x384"
          },
          {
            "src": "maskable_icon.png",
            "type": "image/png",
            "sizes": "192x192",
            "purpose": "any maskable"
          }
        ]
      }
    })
  ]
});


