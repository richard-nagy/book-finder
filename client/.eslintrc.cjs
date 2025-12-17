// JavaScript
// Minimal ESLint config for React + TypeScript.
// Place at: `client/.eslintrc.cjs`
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    env: { browser: true, node: true, es2022: true },
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    settings: { react: { version: "detect" } },
    rules: {
        // add or adjust rules as needed
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
};
