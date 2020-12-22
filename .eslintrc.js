/* eslint-disable */
module.exports = {
  plugins: ["prettier"],
  extends: ["taro/react", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }]
  }
}
