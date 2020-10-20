import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Page,
  getCurrentPages,
  switchTab as _switchTab,
  navigateTo as _navigateTo,
  redirectTo as _redirectTo,
  navigateBack as _navigateBack,
  reLaunch as _reLaunch,
} from "@tarojs/taro";

const AppConfig = {
  pages: [],
};

const promiseify = (fn: Function): any => (args = {}): Promise<any> =>
  new Promise((resolve, reject) => {
    fn({
      ...args,
      fail: reject,
      success: resolve,
    });
  });

/***************************** Page *************************************/

declare type CurrentPage = {
  pages: Page[];
  current: Page;
  isFirst: boolean;
  isTabBar: boolean;
  isRootPage: boolean;
};
/**
 *
 * 获取当前小程序页面信息
 * @returns {CurrentPage} 当前页面信息
 * pages 路由栈
 * current 当前路由页面
 * isFirst 路由栈长度为1
 * isRootPage 当前路由栈是否小程序tabBar页面
 *
 */
export const getCurrPages = (): CurrentPage => {
  const pages = getCurrentPages();
  const current = pages[pages.length - 1];
  return {
    pages,
    current,
    isTabBar: isTabBar(current),
    isFirst: pages.length === 1,
    isRootPage: isRootPage(current),
  };
};

/**
 *
 * 判断页面是否为小程序tabBar页面
 *
 * @param {Page} page Page对象
 * @returns {boolean} Page是否为tabBar页面
 */
export const isTabBar = (page: Page): boolean => {
  // @ts-ignore
  const tabbarPages = AppConfig?.tabbar?.list ?? [];
  return tabbarPages.some((_page) => _page?.pagePath === page.route);
};

/**
 *
 * @param {Page} page Page对象
 * @returns {boolean} Page是否为首页
 *
 */
export const isRootPage = (page: Page): boolean =>
  AppConfig?.pages[0] === page.route;

/****************************** Router ***********************************/
const promiseNavigateTo = promiseify(_navigateTo);
const promiseRedirectTo = promiseify(_redirectTo);
const promiseNavigateBack = promiseify(_navigateBack);
const promiseSwitchTab = promiseify(_switchTab);
const promiseRelaunch = promiseify(_reLaunch);

/**
 * 跳转到指定小程序页面,如果路由栈大于9个,将关闭当前页面,并跳转到目的页面,返回Promise
 * @param {string} url 跳转页面路径
 * @param {General.IAnyObject} events 可选,页面间通信接口，用于监听被打开页面发送到当前页面的数据
 * @returns {Promise<any>} 返回Promise,成功then,失败catch
 *
 */
declare type RouterOption = {
  url: string;
  events?: {
    [key: string]: Function;
  };
};
export const navigateTo = (option: RouterOption): Promise<any> => {
  const { pages } = getCurrPages();
  return (pages.length >= 10 ? promiseRedirectTo : promiseNavigateTo)(option);
};

/**
 *
 * 关闭当前页面并跳转到目标页面,返回Promise
 * @param {string} url 跳转页面路径
 * @returns {Promise<any>} 返回Promise对象
 *
 */
export const redirectTo = (url: string): Promise<any> =>
  promiseRedirectTo({ url });

/**
 * 关闭当前页面,返回上一页面或多级页面
 * @param {number} delta 返回页面栈层数,默认1
 * @returns {Promise<any>} 返回Promise
 */

export const navigateBack = (delta: number = 1): Promise<any> =>
  promiseNavigateBack({ delta });

/**
 * 如果是tabBar页面将关闭所有非tabBar页面,否则关闭当前页面,跳转到目标页面
 * @param {string} url 跳转页面路径
 * @returns {Promise<any>} 返回Promise
 *
 */
export const switchTab = (url: string): Promise<any> => {
  const _isTabBar = isRootPage({ route: url });
  if (!_isTabBar) {
    return redirectTo(url);
  }
  return promiseSwitchTab({ url });
};

/**
 * 关闭所有页面,打开对应页面
 * @param {string} url 打开页面地址
 * @returns {Promise<any>} 返回Promise
 *
 */
export const reLaunch = (url: string): Promise<any> => promiseRelaunch({ url });

/**
 * 关闭所有页面,打开首页
 * @returns {Promise<any>} 返回Promise
 */
export const goToHome = (): Promise<any> => {
  return reLaunch(`/${AppConfig.pages[0]}`);
};
