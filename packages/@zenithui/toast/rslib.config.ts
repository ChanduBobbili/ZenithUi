import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
  tools: {
    webpackChain(chain) {
      chain.module
        .rule('svg')
        .test(/\.svg$/)
        .use('svgr')
        .loader('@svgr/webpack');
    },
  },
});
