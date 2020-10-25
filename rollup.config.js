import fs from "fs";
import path from "path";
import _ from "lodash";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import sizes from "rollup-plugin-sizes";
import cssnanoPreset from "cssnano-preset-default";
import pkg from "./package.json";

const isProd = process.env.BUILD === "production";

function getPath(src) {
  return path.resolve(process.cwd(), src);
}

function isImage(id) {
  return [".jpg", ".jpeg", ".png", ".gif", ".svg"].some((img) =>
    id.includes(img)
  );
}

const externalPaths = {
  hooks: `${pkg.name}/lib/hooks`,
  utils: `${pkg.name}/lib/utils`,
  types: `${pkg.name}/lib/types`,
};

function external(id, parent) {
  // console.log(`external:`, id, `------   external parent:`, parent);
  // console.log(`Object.keys(pkg):`, Object.keys(pkg.dependencies));
  // console.log(
  //   ` Object.keys(pkg).includes(id):`,
  //   Object.keys(pkg.dependencies).includes(id)
  // );
  return (
    // 外部库
    Object.keys({
      ...pkg.dependencies,
      ...pkg.peerDependencies,
    }).includes(id) ||
    // 内部依赖
    (/^components/i.test(id) && !!parent) ||
    (/^hooks/i.test(id) && !!parent) ||
    (/^utils/i.test(id) && !!parent) ||
    // ts相关库
    /tslib/.test(id) ||
    // 把引入的图片当做外部依赖
    isImage(id)
  );
}

function getDirs(src) {
  return fs.readdirSync(src).filter((dir) => dir !== ".DS_Store");
}

function dirToFile(
  dir,
  options = {
    isTsx: false,
    isInput: true,
  }
) {
  const { isInput, isTsx } = options;
  const isFile = dir.includes(".");
  const fileName = dir.split(".")[0];
  const extname = isTsx ? "tsx" : "ts";
  return isInput
    ? isFile
      ? dir
      : `${dir}/index.${extname}`
    : isFile
    ? `${fileName}.js`
    : `${dir}/index.js`;
}

function commonPlugins() {
  return [
    resolve(),
    commonjs({
      exclude: [getPath("packages/**")],
    }),
    alias({
      components: getPath("packages/components"),
      hooks: getPath("packages/hooks"),
      utils: getPath("packages/utils"),
    }),
    typescript({
      clean: true,
      // useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          // declarationDir: "lib/types",
        },
      },
    }),
    isProd && terser(),
    sizes(),
  ];
}

function createStyleConfig(src) {
  const createStylePlugins = (name) => [
    postcss({
      minimize: cssnanoPreset,
      extensions: [".less"],
      extract: path.resolve(`lib/style/${name}.css`),
    }),
  ];
  return _.reduce(
    getDirs(src),
    (configs, dir) => {
      configs.push({
        input: path.resolve(src, `${dir}/index.less`),
        output: {
          file: `lib/style/${dir}.css`,
        },
        plugins: createStylePlugins(dir),
      });
      return configs;
    },
    [
      {
        input: getPath("packages/style/index.less"),
        output: {
          file: `lib/style/index.css`,
        },
        plugins: createStylePlugins("index"),
      },
    ]
  );
}

function createCommonConfig({
  src,
  target = getPath("lib"),
  rollupConfig = {},
  defaultConfig = [],
} = {}) {
  return _.reduce(
    getDirs(src),
    (configs, dir) => {
      return [
        ...configs,
        {
          input: path.resolve(
            src,
            dirToFile(dir, {
              isInput: true,
              isTsx: src.includes("packages/components"),
            })
          ),
          output: {
            format: `es`,
            sourcemap: true,
            paths: externalPaths,
            file: path.resolve(target, dirToFile(dir, { isInput: false })),
          },
          external,
          plugins: commonPlugins(),
          watch: {
            include: "packages/**",
          },
          ...rollupConfig,
        },
      ];
    },
    defaultConfig
  );
}

function buildCommonExternalPaths(src, type) {
  const dirs = getDirs(src).filter((dir) => !dir.includes("."));
  dirs.forEach((dir) => {
    externalPaths[`${type}/${dir}`] = `${pkg.name}/lib/${type}/${dir}`;
  });
}

function createBuildAllConfigs() {
  const input = getPath("packages/index.ts");
  return [
    {
      input,
      external,
      output: {
        format: "es",
        sourcemap: true,
        paths: externalPaths,
        file: pkg.module,
      },
      plugins: commonPlugins(),
    },
    {
      input,
      external,
      output: {
        format: "cjs",
        sourcemap: true,
        paths: externalPaths,
        file: pkg.main,
      },
      plugins: commonPlugins(),
    },
  ];
}

function build() {
  // 添加 externalPaths
  buildCommonExternalPaths(getPath("packages/hooks"), "hooks");
  buildCommonExternalPaths(getPath("packages/utils"), "utils");
  buildCommonExternalPaths(getPath("packages/components"), "components");
  // console.log(`externalPaths:`, externalPaths);
  return [
    // style
    ...createStyleConfig(getPath("packages/components")),
    // hooks
    ...createCommonConfig({
      target: getPath("lib/hooks"),
      src: getPath("packages/hooks"),
    }),
    // utils
    ...createCommonConfig({
      target: getPath("lib/utils"),
      src: getPath("packages/utils"),
    }),
    // components
    ...createCommonConfig({
      src: getPath("packages/components"),
      target: getPath("lib/components"),
    }),
    // all
    ...createBuildAllConfigs(),
  ];
}

export default build();
