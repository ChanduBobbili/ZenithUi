const { resolve } = require("node:path")

const project = resolve(process.cwd(), "tsconfig.json")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["only-warn"],
  env: {
    node: true,
    es2020: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
    "dist/",
    "build/",
    ".eslintrc.cjs",
  ],
  rules: {
    "prettier/prettier": "error",
  },
}
