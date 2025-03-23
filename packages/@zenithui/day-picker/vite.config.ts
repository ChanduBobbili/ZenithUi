import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      rollupTypes: false,
      include: ["src"],
      insertTypesEntry: true,
      entryRoot: "src",
    }),
    svgr(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@zenithui/day-picker",
      formats: ["es"],
      fileName: "index",
    },
    cssCodeSplit: true,
    minify: "esbuild",
    cssMinify: "esbuild",
    sourcemap: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
