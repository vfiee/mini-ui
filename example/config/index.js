/* eslint-disable */
const path = require("path");
const _ = require("lodash");

const commonAlias = {
  "@": getPath("src"),
  "@Images": getPath("src/assets/images"),
  "@Components": getPath("src/components"),
};
let allModeAlias = {
  packages: {
    utils: getPath("../packages/utils"),
    hooks: getPath("../packages/hooks"),
    types: getPath("../packages/types"),
    components: getPath("../packages/components"),
    "@vyron/mini-ui": getPath("../packages/index.ts"),
  },
  dist: {
    "@vyron/mini-ui": getPath("../dist/index.es.js"),
  },
};

const config = {
  projectName: "example",
  date: "2020-10-17",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  alias: _.assign(
    commonAlias,
    _.get(allModeAlias, process.env.EXAMPLE_ENV, allModeAlias["packages"])
  ),
  framework: "react",
  mini: {
    imageUrlLoaderOption: {
      limit: 0,
    },
    compile: {
      include: [
        getPath("../packages"),
        (modulePath) => {
          console.log(`modulePath:`, modulePath);
          return modulePath.include(".tsx");
        },
      ],
      exclude: [getPath("../lib"), getPath("../dist"), getPath("node_modules")],
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

function getPath(src = "") {
  return path.resolve(process.cwd(), src);
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
