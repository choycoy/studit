import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({
    svgrOptions: {
      exportType: "default",
      ref: true,
      svgo: false,
      titleProp: true,
    },
    include: "**/*.svg",
  }), sentryVitePlugin({
    org: "studit-y3",
    project: "javascript-react"
  })],

  optimizeDeps: {
    include: ["msw"],
  },

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },

  server: {
    port: 3000,
  },

  build: {
    sourcemap: true
  }
});