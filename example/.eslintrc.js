/*
 * @Author: your name
 * @Date: 2020-10-22 11:38:21
 * @LastEditTime: 2020-12-23 09:11:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /v-mini-ui/example/.eslintrc.js
 */
/* eslint-disable */
module.exports = {
  plugins: ["prettier"],
  extends: ["taro/react", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "prettier/prettier": ["error", {}, require("v-prettier")]
  },
  ignorePatterns: ["*.js"]
};
