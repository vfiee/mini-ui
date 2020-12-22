import { getSetting, authorize, showModal, openSetting } from "@tarojs/taro";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthScope } from "types";

/**
 *
 * @param {AuthScope} scope 需要获取的授权项
 * @param {string} message 授权曾拒绝,提示打开设置页面的提示信息
 * @returns {Promise<any>} 返回 Promise<any>
 *
 */

const SCOPE_MESSAGE = {
  userinfo: "用户信息",
  userLocation: "地理位置",
  userLocationBackground: "后台定位",
  werun: "微信运动步数",
  record: "录音功能",
  writePhotosAlbum: "保存到相册",
  camera: "摄像头"
};

export const ensureAuthScope = async (
  scope: AuthScope,
  message?: string
): Promise<any> => {
  const { authSetting } = await getSetting();
  if (scope && authSetting[`scope.${scope}`] === true) {
    return authSetting;
  } else if (authSetting[`scope.${scope}`] === void 0) {
    return await authorize({
      scope: `scope.${scope}`
    });
  }
  return await showModal({
    title: "权限申请",
    content:
      message ||
      `检测到小程序已关闭${SCOPE_MESSAGE[scope] || "相关"}权限,是否前往打开?`,
    confirmText: "打开"
  })
    .then(res => {
      if (res.confirm) {
        return openSetting();
      } else {
        throw new Error("未授权,用户已取消!");
      }
    })
    .then(res => {
      const { authSetting: _auth } = res;
      if (_auth && _auth[`scope.${scope}`]) {
        return _auth;
      } else {
        throw new Error("用户未授权");
      }
    });
};
