import {
  getSystemInfoSync as _getSystemInfoSync,
  getMenuButtonBoundingClientRect as _getMenuRect,
} from "@tarojs/taro";

export * from "./route";

export * from "./setting";

/**
 * 获取系统信息
 * @returns {Taro.getSystemInfoSync.Result} 当前设备系统信息
 */
let systemInfo: Taro.getSystemInfoSync.Result;
export const getSystemInfoSync = () => {
  if (systemInfo == null) {
    systemInfo = _getSystemInfoSync();
  }
  return systemInfo;
};

/**
 *
 * 获取菜单按钮的布局位置信息
 * @returns {Taro.getMenuButtonBoundingClientRect.Rect} 菜单按钮的布局位置信息
 */
let menuButtonRect: Taro.getMenuButtonBoundingClientRect.Rect;
export const getMenuButtonBoundingClientRect = () => {
  if (menuButtonRect == null) {
    menuButtonRect = _getMenuRect();
  }
  return menuButtonRect;
};
