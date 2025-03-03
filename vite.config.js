import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  build: {
    outDir: "../public",
    rollupOptions: {
      input: "./api/index.js",
    },
  },
});
