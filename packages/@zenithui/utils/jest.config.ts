import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/"],
	testMatch: ["**/tests/**/*.test.ts"],
	moduleFileExtensions: ["ts", "js", "tsx", "jsx"],
	moduleNameMapper: {
		"^@zenithui/utils(.*)$": "<rootDir>/src$1",
	},
};

export default config;
