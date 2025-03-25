import { pluginReact } from "@rsbuild/plugin-react"
import { defineConfig } from "@rslib/core"
import { pluginDts } from "rsbuild-plugin-dts"

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
  plugins: [
    pluginReact(),
    pluginDts({
      autoExternal: {
        dependencies: true,
        peerDependencies: true,
        devDependencies: false,
      },
    }),
  ],
})
