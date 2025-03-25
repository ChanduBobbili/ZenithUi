import { pluginReact } from "@rsbuild/plugin-react"
import { defineConfig } from "@rslib/core"
import { pluginSvgr } from "@rsbuild/plugin-svgr"
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer"

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
  plugins: [pluginReact(), pluginSvgr(), pluginCssMinimizer()],
})
