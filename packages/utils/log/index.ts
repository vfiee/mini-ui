const isProd = process.env.NODE_ENV === "production";

const MiniConsole = {
  log(...args: any[]) {
    !isProd && console.log(`[Mini ui]: `, ...args);
  },
  error(...args: any[]) {
    !isProd && console.error(`[Mini ui]: `, ...args);
  },
  warn(...args: any[]) {
    !isProd && console.warn(`[Mini ui]: `, ...args);
  },
};

export default MiniConsole;
