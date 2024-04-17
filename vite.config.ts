import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
// import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
// import { viteSingleFile } from "vite-plugin-singlefile"

// const pwaOptions: Partial<VitePWAOptions> = {
//   includeAssets: [
//       "**/*",
//   ],
//   registerType: 'autoUpdate',
//   workbox: {
//     clientsClaim: true,
//     skipWaiting: true,
//     globPatterns: ["**/*"],
//   },
//   manifest: {
//     name: 'Pfadinamen Finder',
//     short_name: 'Pfadinamen Finder',
//     theme_color: '#ffffff',
//     icons: [
//       {
//         src: 'android-chrome-192x192.png',
//         sizes: '192x192',
//         type: 'image/png',
//       },
//       {
//         src: 'android-chrome-512x512.png',
//         sizes: '512x512',
//         type: 'image/png',
//         purpose: 'any maskable',
//       },
//     ],
//   },
//   devOptions: {
//     enabled: process.env.NODE_ENV !== 'production',
//     type: 'module',
//     navigateFallback: 'index.html',
//   },
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
});
