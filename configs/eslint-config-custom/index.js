const { resolve } = require("node:path")

const project = resolve(process.cwd(), "tsconfig.json")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["only-warn", "react-refresh"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
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
    ".storybook/",
    "storybook-static/",
    "postcss.config.cjs",
    "config/",
    "build/",
    ".eslintrc.cjs",
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    "react-refresh/only-export-components": [
      "off",
      { allowConstantExport: true },
    ],
    "prettier/prettier": "error",
  },
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
}
