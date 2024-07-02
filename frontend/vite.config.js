import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // Adjust alias based on your project structure
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // or "prompt" as per your preference
      includeAssets: ["favicon.ico", "logo192.png", "logo512.png", "logo256.png", "logo384.png", "maskable_icon.png"],
      manifest: {
        theme_color: "#ffffff",
        background_color: "#000000",
        orientation: "any",
        display: "standalone",
        dir: "auto",
        lang: "en-US",
        name: "mule foods",
        short_name: "mule foods app",
        icons: [
          {
            src: "/favicon.ico", // Adjust paths relative to the public folder
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/logo256.png",
            type: "image/png",
            sizes: "256x256",
          },
          {
            src: "/logo384.png",
            type: "image/png",
            sizes: "384x384",
          },
          {
            src: "/maskable_icon.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
