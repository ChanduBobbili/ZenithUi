/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "eslint-config-turbo",
    "react-app",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
    "dist/",
    "config/",
    "build/",
    ".eslintrc.cjs",
  ],
  rules: {
    "prettier/prettier": "error",
    "no-prototype-builtins": "off",
  },
}
