import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { defineConfig } from "@rslib/core";
import { pluginDts } from "rsbuild-plugin-dts";

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
  plugins: [
    pluginReact(),
    pluginCssMinimizer(),
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
});
