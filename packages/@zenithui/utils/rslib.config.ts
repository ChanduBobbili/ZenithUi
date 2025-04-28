import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";
import { pluginDts } from "rsbuild-plugin-dts";

export default defineConfig({
	source: {
		entry: {
			index: ["./src/index.ts"],
		},
		exclude: ["tests", "**/*.test.ts", "**/__tests__/**"],
	},
	lib: [
		{
			bundle: true,
			dts: true,
			format: "esm",
		},
		{
			bundle: true,
			dts: true,
			format: "cjs",
		},
	],
	output: {
		target: "web",
		externals: {
			react: "react",
			"react-dom": "react-dom",
			"react/jsx-runtime": "react/jsx-runtime",
		},
		minify: true,
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
});
