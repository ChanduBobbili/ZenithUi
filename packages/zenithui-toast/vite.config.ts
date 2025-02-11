import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ZenithUI-Light-Box",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: [
        {
          format: "es",
          dir: "dist/esm",
          entryFileNames: "[name].js",
          preserveModules: false,
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
          preserveModules: false,
        },
      ],
    },
    sourcemap: true,
  },
  plugins: [react(), dts({ copyDtsFiles: true, rollupTypes: true })],
  css: {
    postcss: {
      plugins: [],
    },
  },
})
