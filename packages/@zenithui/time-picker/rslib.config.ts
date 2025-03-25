import { pluginReact } from "@rsbuild/plugin-react"
import { defineConfig } from "@rslib/core"

export default defineConfig({
  source: {
    entry: {
      index: ["./src/index.tsx"],
    },
  },
  lib: [
    {
      bundle: true,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "react/jsx-runtime": "react/jsx-runtime",
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  plugins: [pluginReact()],
})
