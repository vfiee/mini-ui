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
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

const isProd = process.env.BUILD === "production";
const isBuildAll = process.env.BUILD_ALL === "true";
const outputDir = process.env.OUTPUT || isProd ? "lib" : "example/lib";

function getPath(src) {
  return path.resolve(process.cwd(), src);
}

function isImage(id) {
  return [".jpg", ".jpeg", ".png", ".gif", ".svg"].some((img) =>
    id.includes(img)
  );
}

const externalPaths = {
  hooks: `${pkg.name}/${outputDir}/hooks`,
  utils: `${pkg.name}/${outputDir}/utils`,
  types: `${pkg.name}/${outputDir}/types`,
};

function external(id, parent) {
  const isPkgDep = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  }).includes(id);
  const isInternalDep =
    (/^components/i.test(id) && !!parent) ||
    (/^hooks/i.test(id) && !!parent) ||
    (/^utils/i.test(id) && !!parent);
  const isTsLib = /tslib/.test(id);
  const baseExternal = isPkgDep || isTsLib || isImage(id);
  return isBuildAll ? baseExternal || isInternalDep : baseExternal;
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
  const createStylePlugins = (name, isCopy = false) => {
    const plugins = [
      postcss({
        minimize: cssnanoPreset,
        extensions: [".less"],
        extract: path.resolve(`${outputDir}/style/${name}.css`),
      }),
    ];
    if (isCopy) {
      plugins.push(
        copy({
          targets: [{ src: "packages/assets", dest: `${outputDir}` }],
        })
      );
    }
    return plugins;
  };
  return _.reduce(
    getDirs(src),
    (configs, dir) => {
      configs.push({
        input: path.resolve(src, `${dir}/index.less`),
        output: {
          file: `${outputDir}/style/${dir}.css`,
        },
        plugins: createStylePlugins(dir),
      });
      return configs;
    },
    [
      {
        input: getPath("packages/style/index.less"),
        output: {
          file: `${outputDir}/style/index.css`,
        },
        plugins: createStylePlugins("index", true),
      },
    ]
  );
}

function createCommonConfig({
  src,
  target = getPath(outputDir),
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
            include: ["packages/**", "packages/types/**"],
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
    externalPaths[`${type}/${dir}`] = `${pkg.name}/${outputDir}/${type}/${dir}`;
  });
}

function createBuildAllConfigs() {
  const input = getPath("packages/index.ts");
  const outputPrefix = isProd ? "" : outputDir;
  return [
    {
      input,
      external,
      output: {
        format: "es",
        sourcemap: true,
        file: `${outputPrefix}/${pkg.module}`,
      },
      plugins: commonPlugins(),
    },
    {
      input,
      external,
      output: {
        format: "cjs",
        sourcemap: true,
        file: `${outputPrefix}/${pkg.main}`,
      },
      plugins: [
        ...commonPlugins(),
        copy({
          targets: [
            {
              dest: outputDir,
              src: "packages/types",
            },
          ],
        }),
      ],
    },
  ];
}

function build() {
  if (isBuildAll) {
    // 添加 externalPaths
    buildCommonExternalPaths(getPath("packages/hooks"), "hooks");
    buildCommonExternalPaths(getPath("packages/utils"), "utils");
    buildCommonExternalPaths(getPath("packages/components"), "components");
    // console.log(`externalPaths:`, externalPaths);
  }
  const libConfigs = [
    // hooks
    ...createCommonConfig({
      target: getPath(`${outputDir}/hooks`),
      src: getPath("packages/hooks"),
    }),
    // utils
    ...createCommonConfig({
      target: getPath(`${outputDir}/utils`),
      src: getPath("packages/utils"),
    }),
    // components
    ...createCommonConfig({
      src: getPath("packages/components"),
      target: getPath(`${outputDir}/components`),
    }),
  ];
  const baseConfigs = [
    // style
    ...createStyleConfig(getPath("packages/components")),
    // es cjs
    ...createBuildAllConfigs(),
  ];
  return isBuildAll ? [...baseConfigs, ...libConfigs] : baseConfigs;
}

export default build();
