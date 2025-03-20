import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        cli: path.resolve(__dirname, "src/cli.js"),
      },
      name: "zenithui-day-picker",
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
  plugins: [
    react(),
    libInjectCss(),
    dts({ copyDtsFiles: true, rollupTypes: true }),
    svgr(),
  ],
})
