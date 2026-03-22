import { defineConfig, type Plugin } from "vite";
import path from "path";

// Functions that GAS needs to discover as top-level declarations.
// GAS only sees `function foo()` at the top level — not assignments to globalThis.
// The IIFE stores implementations on globalThis; these stubs delegate to them.
const gasEntryPoints = [
  "doGet",
  "doPost",
  "onOpen",
  "createSelectedRowsDocumentsWithUi",
  "promptAndAddEditor",
  "testLiability",
  "testMedical",
  "testLiabilityPDF",
];

const gasStubs = gasEntryPoints
  .map((name) => `function ${name}() { return globalThis.${name}.apply(this, arguments); }`)
  .join("\n");

// GAS polyfills — must run before pdf-lib code
const gasPolyfills = [
  'if (typeof setTimeout === "undefined") { globalThis.setTimeout = function(cb) { cb(); }; }',
].join("\n");

// Maps npm packages to GAS globals. Named imports are lazily resolved at call time
// (not load time), so GAS file load order doesn't matter. Works with instanceof.
// Usage: import { PDFDocument } from "pdf-lib" → resolves to globalThis.PDFLib.PDFDocument
function gasLazyGlobal(mapping: Record<string, string>): Plugin {
  return {
    name: "gas-lazy-global",
    enforce: "pre" as const,
    resolveId(source) {
      if (source in mapping) return { id: `\0gas-lazy:${source}`, moduleSideEffects: false };
      return null;
    },
    load(id) {
      if (!id.startsWith("\0gas-lazy:")) return null;
      const source = id.slice("\0gas-lazy:".length);
      const globalName = mapping[source];
      return {
        code: [
          `const _g = () => globalThis.${globalName};`,
          `const _lazy = (name) => new Proxy(function(){}, {`,
          `  get(_, p) { return _g()[name][p]; },`,
          `  apply(_, t, a) { return Reflect.apply(_g()[name], t, a); },`,
          `  construct(_, a) { return Reflect.construct(_g()[name], a); },`,
          `});`,
          `export default new Proxy({}, { get(_, name) { return _lazy(name); } });`,
        ].join("\n"),
        syntheticNamedExports: true,
      };
    },
  };
}

// `--mode lib` builds pdf-lib as a standalone IIFE (only needed on lib version change).
// Default mode builds the backend code with pdf-lib as a lazy global reference.
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      publicDir: false,
      build: {
        lib: {
          entry: path.resolve(__dirname, "src/backend/lib/pdf-lib.ts"),
          formats: ["iife"],
          name: "PDFLib",
          fileName: () => "PDFLib.js",
        },
        outDir: "dist/gas",
        emptyOutDir: false,
        minify: true,
        sourcemap: false,
        target: "es2020",
        rollupOptions: { output: { banner: gasPolyfills } },
      },
    };
  }

  return {
    publicDir: false,
    plugins: [gasLazyGlobal({ "pdf-lib": "PDFLib" })],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/backend/index.ts"),
        formats: ["iife"],
        name: "GASBundle",
        fileName: () => "Code.js",
      },
      outDir: "dist/gas",
      emptyOutDir: false,
      minify: false,
      sourcemap: false,
      target: "es2020",
      rollupOptions: { output: { extend: true, entryFileNames: "Code.js", footer: gasStubs } },
    },
  };
});
