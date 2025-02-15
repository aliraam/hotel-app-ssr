import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { VitePWA } from "vite-plugin-pwa";
import type { UserConfig } from "vitest/config";

const test = {
  globals: true,
  environment: "jsdom",
  setupFiles: ["src/__tests__/setupTests.ts"],
  threads: false,
  watch: false,
} as UserConfig["test"];

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    react(),
    ssr({ prerender: false }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["/favicon.ico", "/icons/icon-192x192.png", "/icons/icon-512x512.png"],
      manifest: {
        name: "Tehran Hotels Finder",
        short_name: "Hotels",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#1E3A8A",
        background_color: "#ffffff",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/map.ir\/.*/, // Cache Map.ir
            handler: "NetworkFirst",
            options: {
              cacheName: "map-ir-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 86400 }, // 1 day
            },
          },
          {
            urlPattern: /^https:\/\/api.yourbackend.com\/.*/, // Cache API responses
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 3600 }, // 1 hour
            },
          },
        ],
      },
    }),
  ],
  server: { port: 3000 },
  build: {
    minify: false,
  },
});
