import { pluginReact } from "@rsbuild/plugin-react"
import { defineConfig } from "@rslib/core"
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer"

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
    },
  },
  lib: [
    {
      bundle: false,
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
  plugins: [pluginReact(), pluginCssMinimizer()],
})
