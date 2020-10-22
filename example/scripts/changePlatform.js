/* eslint-disable */
const pkg = require("../package.json");
const chalk = require("chalk");
const fs = require("fs");
const { exec } = require("child_process");

const platforms = [
  "weapp",
  "swan",
  "alipay",
  "h5",
  "rn",
  "tt",
  "qq",
  "quickapp",
];
const args = process.argv.slice(2);
const platform = args[0];
if (!platform) {
  console.log();
  console.log(
    chalk.red(`Please set a platform type
  `)
  );
  process.exit();
} else if (!platforms.includes(platform)) {
  console.log();
  console.log(
    chalk.red(
      `Unsupported platform type: ${platform}, Legal platform type is ${platforms.join(
        ","
      )}
      `
    )
  );
  process.exit();
}
pkg["taro_platform"] = platform;

fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(pkg, null, 2));

exec(
  `prettier ${process.cwd()}/package.json --write`,
  (err, stdout, stderr) => {
    console.log(err);
  }
);
console.log(
  chalk.green(`
🎉🎉🎉 taro_platform 已更换为: ${platform}
`)
);
process.exit();
