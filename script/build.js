/* eslint-disable */
const fs = require("fs");
const path = require("path");
const rollup = require("rollup");
const typescript = require("rollup-plugin-typescript2");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve").default;
// const image = require("@rollup/plugin-image");
const copy = require("rollup-plugin-copy");
const image = require("rollup-plugin-image-files");
const postcss = require("rollup-plugin-postcss");
const alias = require("@rollup/plugin-alias");
const pkg = require("../package.json");

function resolvePath(_path) {
  return path.resolve(process.cwd(), _path);
}

function isImage(id) {
  return [".jpg", ".jpeg", ".png", ".gif", ".svg"].some((img) =>
    id.includes(img)
  );
}

function isInternalExternal(id, parent) {
  return (
    /^.\/[a-z]+/.test(id) &&
    [
      "mini-components/packages/index.ts",
      "mini-components/packages/common/hooks/index.ts",
    ].some((_path) => parent.includes(_path))
  );
}

function external(id, parent) {
  if (isImage(id, parent) || isInternalExternal(id, parent)) {
    return true;
  }
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

// 创建rollup配置
function createConfig(entry, output, externalPaths) {
  return {
    input: entry,
    output: {
      format: `es`,
      file: output,
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
        extract: output,
        extensions: [".less"],
      }),
      commonjs({
        exclude: [resolvePath("packages/**")],
      }),
      json(),
      // image(),
      // url({
      //   exclude: ["node_modules"],
      //   includes: [
      //     "**/*.svg",
      //     "**/*.png",
      //     "**/*.jpg",
      //     "**/*.gif",
      //     "**/*.jpeg",
      //     "**/*.woff",
      //     "**/*.woff2",
      //     "**/*.ttf",
      //     "**/*.eot",
      //   ],
      //   limit: 0,
      // }),
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: "lib/type",
          },
        },
      }),
    ],
  };
}

// 获取文件夹名称
function getDirs(src) {
  const ignoreDirs = ["style", "assets"];
  return fs
    .readdirSync(src)
    .filter((dir) => !ignoreDirs.includes(dir) && !dir.includes("."));
}

// 是否文件夹
function isDirectory(src) {
  return fs.existsSync(src) && fs.lstatSync(src).isDirectory();
}

// 删除文件夹
function deleteDir(url) {
  var files = [];
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url); //返回文件和子目录的数组
    files.forEach((file) => {
      var curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(url); //清除文件夹
  } else {
    console.log("给定的路径不存在:", url);
  }
}

// 生成 externalPaths
function generateExternalPaths() {
  const componentsDirs = getDirs(resolvePath(`packages`));
  const hooksDirs = getDirs(resolvePath(`packages/common/hooks`));
  function getExternalPaths(dirs, isHook = false) {
    return dirs.reduce((result, dir) => {
      const transPath = `${pkg.name}/lib/${
        isHook ? "common/hooks/" : ``
      }${dir}`;
      result[`${pkg.name}/${isHook ? "common/hooks/" : ""}${dir}`] = transPath;
      result[`./${dir}`] = transPath;
      return result;
    }, {});
  }
  return {
    ...{
      "@vyron/mini-components/index": "@vyron/mini-components",
      "@vyron/mini-components/hooks/index":
        "@vyron/mini-components/lib/common/hooks",
    },
    ...getExternalPaths(hooksDirs, true),
    ...getExternalPaths(componentsDirs),
  };
}

// 打包组件
function buildComponents(src, externalPaths) {
  const dirs = getDirs(resolvePath(`packages/${src || ""}`));
  // 插入index
  dirs.unshift("index");
  return dirs.map((dir) => {
    const base = `${src ? `${src}/` : ""}`;
    const filePath = `${dir === "index" ? "" : `${dir}/`}index`;
    let inputPath = resolvePath(`packages/${base}/${filePath}`);
    if (fs.existsSync(`${inputPath}.tsx`)) {
      inputPath = `${inputPath}.tsx`;
    } else {
      inputPath = `${inputPath}.ts`;
    }
    const { output, ...input } = createConfig(
      inputPath,
      resolvePath(`lib/${base}/${filePath}.js`),
      externalPaths
    );
    return async function rollupBuild() {
      await build(input, output);
    };
  });
}

// 打包样式
function buildStyle(externalPaths) {
  const dirs = getDirs(resolvePath(`packages`));
  // 构建 style
  dirs.push("style");
  let buildList = [];
  dirs.forEach((dir, index) => {
    const inputFilePath = `${
      dir === "index" ? `index.less` : `${dir}/index.less`
    }`;
    const outputFilePath =
      dir === "style" ? `style/index.less` : `style/${dir}.less`;
    if (!fs.existsSync(resolvePath(`packages/${inputFilePath}`))) {
      return;
    }
    const { output, ...input } = createConfig(
      resolvePath(`packages/${inputFilePath}`),
      resolvePath(`lib/${outputFilePath}`),
      externalPaths
    );
    if (index === 0) {
      input.plugins.unshift(
        copy({
          targets: [{ src: "packages/assets", dest: "lib" }],
        })
      );
    }
    buildList.push(async function rollupBuild() {
      await build(input, output).catch((err) => {
        console.log(`error:`, err);
      });
    });
  });
  return buildList;
}

function copyTsDeclareFiles(src, baseDir = "") {
  const dtsDirs = fs.readdirSync(resolvePath(src));
  const files = dtsDirs.filter((dir) => dir.includes(".d.ts"));
  const dirs = dtsDirs.filter((dir) => !dir.includes(".d.ts"));
  files.forEach((file) => {
    const dirPath = path.resolve(`lib/${baseDir}`);
    if (!isDirectory(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.copyFileSync(
      resolvePath(`${src}/${file}`),
      resolvePath(`lib/${baseDir}/${file}`)
    );
  });
  dirs.forEach((dir) =>
    copyTsDeclareFiles(`${src}/${dir}`, `${baseDir}/${dir}`)
  );
}

async function init() {
  // 生成 externalPaths
  const externalPaths = generateExternalPaths();
  // console.log(`externalPaths:`, externalPaths);
  // 构建打包
  const buildList = [
    ...buildComponents("common/hooks", externalPaths),
    ...buildComponents(undefined, externalPaths),
    ...buildStyle(externalPaths),
  ];
  for (const _build of buildList) {
    await _build();
  }
  // 由于rollup-plugin-typescript2生成ts声明文件路径问题,粘贴到响应的文件夹下
  copyTsDeclareFiles("lib/type/packages");

  deleteDir(resolvePath("lib/type"));

  // 结束进程
  process.exit();
}

async function build(inputOps, outputOps) {
  const bundle = await rollup.rollup(inputOps);
  await bundle.generate(outputOps);
  await bundle.write(outputOps);
}

init();
