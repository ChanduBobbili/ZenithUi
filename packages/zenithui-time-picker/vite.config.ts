import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ZenithUI",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: false,
      },
    },
    sourcemap: true, // Generate source maps for easier debugging
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({ copyDtsFiles: true, rollupTypes: true }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})
