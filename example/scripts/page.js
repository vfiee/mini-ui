/* eslint-disable */
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const prettier = require("prettier");

const getDirs = (src) =>
  fs.readdirSync(src).filter((dir) => !dir.includes(".") && dir !== "index");

const indexTpl = (jsx) => `import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

export default class Index extends React.Component {
  navigator = (dir) => {
    Taro.navigateTo({ url: \`/pages/\${dir}/index\` });
  };
  render() {
    return (
      <View className="wrap">${jsx}</View>
    );
  }
}

`;

function main() {
  const dirs = getDirs(path.resolve(__dirname, "../src/pages"));
  const result = _.reduce(
    dirs,
    (res, dir, index) => {
      res += `\n<View className="item" onClick={()=>this.navigator("${dir}")}>
            ${_.upperFirst(dir)}
        </View>\n`;
      return res;
    },
    ""
  );
  const indexTsx = indexTpl(result);
  fs.writeFileSync(
    path.resolve(__dirname, "../src/pages/index/index.tsx"),
    prettier.format(indexTsx)
  );
}

main();
