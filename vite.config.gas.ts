import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/backend/index.ts"),
      formats: ["iife"],
      name: "GASBundle",
      fileName: () => "Code.js",
    },
    outDir: "dist/gas",
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    target: "es2020",
    rollupOptions: {
      output: {
        extend: true,
        entryFileNames: "Code.js",
        banner: `// GAS polyfill — pdf-lib uses setTimeout, which GAS doesn't have
if (typeof setTimeout === "undefined") { globalThis.setTimeout = function(cb) { cb(); }; }`,
      },
    },
  },
});
