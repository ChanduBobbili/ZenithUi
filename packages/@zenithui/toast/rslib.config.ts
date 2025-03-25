import { pluginReact } from "@rsbuild/plugin-react"
import { defineConfig } from "@rslib/core"
import { pluginSvgr } from "@rsbuild/plugin-svgr"
import { pluginDts } from "rsbuild-plugin-dts"

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
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
    pluginSvgr({
      svgrOptions: {
        icon: true,
        typescript: true,
      },
    }),
    pluginDts({
      autoExternal: {
        dependencies: true,
        peerDependencies: true,
        devDependencies: false,
      },
    }),
  ],
})
