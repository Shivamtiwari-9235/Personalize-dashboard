module.exports = {
  extends: ["next/core-web-vitals", "next", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "react/react-in-jsx-scope": "off",
  },
};
