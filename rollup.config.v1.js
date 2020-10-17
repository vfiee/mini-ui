import fs from "fs";
import path from "path";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import image from "rollup-plugin-image-files";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import pkg from "./package.json";

const externalPaths = {};

function resolvePath(_path) {
  return path.resolve(process.cwd(), _path);
}

function external(id, parent) {
  console.log(`external:`, id, `------   external parent:`, parent);
  return (
    /^react$/.test(id) ||
    /^react-dom$/.test(id) ||
    /^@tarojs\/taro/.test(id) ||
    /^@tarojs\/runtime/.test(id) ||
    /^@tarojs\/components/.test(id) ||
    /^@tarojs\/react/.test(id) ||
    (/^@vyron\/mini-components/i.test(id) && !!parent) ||
    /tslib/.test(id)
  );
}

function createConfig(entry, output, externalPaths) {
  return {
    input: `packages/appbar/index.tsx`,
    output: {
      format: `es`,
      file: `lib/appbar/index.js`,
      sourcemap: true,
      paths: externalPaths,
    },
    external,
    plugins: [
      resolve(),
      alias({
        "@vyron/mini-components": resolvePath("packages"),
      }),
      postcss({
        extract: "index.css",
        extensions: [".css", ".less"],
      }),
      commonjs({
        exclude: [resolvePath("packages/**")],
      }),
      json(),
      image(),
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: "lib/types",
          },
        },
      }),
    ],
  };
}

function createComponentsConfigList(path) {
  const dirs = fs
    .readdirSync(resolvePath(path))
    .filter((dir) => dir !== "style" && !dir.includes("."));
  return dirs.map((dir) => {
    const entry = fs.existsSync(`${path}/${dir}/index.tsx`)
      ? `${path}/${dir}/index.tsx`
      : `${path}/${dir}/index.ts`;
    const output = `lib/${dir}/index.js`;
    externalPaths[`${pkg.name}/${dir}`] = `${pkg.name}/lib/${dir}`;
    return createConfig(entry, output, externalPaths);
  });
}

function createHooksConfigList(path) {
  const dirs = fs.readdirSync(path).filter((dir) => !dir.includes("."));
  return dirs.map((dir) => {
    const entry = `${path}/${dir}/index.ts`;
    const output = `lib/common/hooks/${dir}/index.js`;
    externalPaths[
      `${pkg.name}/hooks/${dir}`
    ] = `${pkg.name}/lib/common/hooks/${dir}`;
    return createConfig(entry, output, externalPaths);
  });
}

function createOthersConfig(path) {
  const filterDirs = ["components", "types"];
  const dirs = fs
    .readdirSync(path)
    .filter((dir) => !filterDirs.includes(dir) && !dir.includes("."));
  return dirs.map((dir) => {
    const isAssets = dir === "assets";
    const entry = isAssets
      ? `${path}/assets/style/index.less`
      : `${path}/${dir}/index.ts`;
    const output = isAssets ? `lib/index.css` : `lib/${dir}/index.js`;
    if (dir !== "assets") {
      externalPaths[
        `${pkg.name}/${dir}/index`
      ] = `${pkg.name}/lib/${dir}/index`;
    }
    return createConfig(entry, output, externalPaths);
  });
}

function createConfigList() {
  const componentsConfig = createComponentsConfigList(resolvePath(`packages`));
  const hooksConfig = createHooksConfigList(
    resolvePath(`packages/common/hooks`)
  );
  // const othersConfig = createOthersConfig(resolvePath(`packages`));
  return [
    ...hooksConfig,
    // ...othersConfig,
    ...componentsConfig,
    createConfig(
      resolvePath(`packages/index.ts`),
      `lib/index.js`,
      externalPaths
    ),
  ];
}

// export default createConfig();
console.log(fs.mkdirSync(`/Users/vyron/Mine/mini-components/lib/common/hooks`));
