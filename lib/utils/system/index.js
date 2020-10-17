import { getCurrentPages, navigateTo as navigateTo$1, redirectTo as redirectTo$1, navigateBack as navigateBack$1, switchTab as switchTab$1, reLaunch as reLaunch$1, showModal, openSetting, authorize, getSetting, getSystemInfoSync as getSystemInfoSync$1, getMenuButtonBoundingClientRect as getMenuButtonBoundingClientRect$1 } from '@tarojs/taro';
import { __assign, __awaiter, __generator } from 'tslib';

var AppConfig = {
    pages: [],
};
var promiseify = function (fn) { return function (args) {
    if (args === void 0) { args = {}; }
    return new Promise(function (resolve, reject) {
        fn(__assign(__assign({}, args), { fail: reject, success: resolve }));
    });
}; };
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
var getCurrPages = function () {
    var pages = getCurrentPages();
    var current = pages[pages.length - 1];
    return {
        pages: pages,
        current: current,
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
var isTabBar = function (page) {
    var _a, _b;
    // @ts-ignore
    var tabbarPages = (_b = (_a = AppConfig === null || AppConfig === void 0 ? void 0 : AppConfig.tabbar) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
    return tabbarPages.some(function (_page) { return (_page === null || _page === void 0 ? void 0 : _page.pagePath) === page.route; });
};
/**
 *
 * @param {Page} page Page对象
 * @returns {boolean} Page是否为首页
 *
 */
var isRootPage = function (page) {
    return (AppConfig === null || AppConfig === void 0 ? void 0 : AppConfig.pages[0]) === page.route;
};
/****************************** Router ***********************************/
var promiseNavigateTo = promiseify(navigateTo$1);
var promiseRedirectTo = promiseify(redirectTo$1);
var promiseNavigateBack = promiseify(navigateBack$1);
var promiseSwitchTab = promiseify(switchTab$1);
var promiseRelaunch = promiseify(reLaunch$1);
var navigateTo = function (option) {
    var pages = getCurrPages().pages;
    return (pages.length >= 10 ? promiseRedirectTo : promiseNavigateTo)(option);
};
/**
 *
 * 关闭当前页面并跳转到目标页面,返回Promise
 * @param {string} url 跳转页面路径
 * @returns {Promise<any>} 返回Promise对象
 *
 */
var redirectTo = function (url) {
    return promiseRedirectTo({ url: url });
};
/**
 * 关闭当前页面,返回上一页面或多级页面
 * @param {number} delta 返回页面栈层数,默认1
 * @returns {Promise<any>} 返回Promise
 */
var navigateBack = function (delta) {
    if (delta === void 0) { delta = 1; }
    return promiseNavigateBack({ delta: delta });
};
/**
 * 如果是tabBar页面将关闭所有非tabBar页面,否则关闭当前页面,跳转到目标页面
 * @param {string} url 跳转页面路径
 * @returns {Promise<any>} 返回Promise
 *
 */
var switchTab = function (url) {
    var _isTabBar = isRootPage({ route: url });
    if (!_isTabBar) {
        return redirectTo(url);
    }
    return promiseSwitchTab({ url: url });
};
/**
 * 关闭所有页面,打开对应页面
 * @param {string} url 打开页面地址
 * @returns {Promise<any>} 返回Promise
 *
 */
var reLaunch = function (url) { return promiseRelaunch({ url: url }); };
/**
 * 关闭所有页面,打开首页
 * @returns {Promise<any>} 返回Promise
 */
var goToHome = function () {
    return reLaunch("/" + AppConfig.pages[0]);
};

/**
 *
 * @param {AuthScope} scope 需要获取的授权项
 * @param {string} message 授权曾拒绝,提示打开设置页面的提示信息
 * @returns {Promise<any>} 返回 Promise<any>
 *
 */
var SCOPE_MESSAGE = {
    userinfo: "用户信息",
    userLocation: "地理位置",
    userLocationBackground: "后台定位",
    address: "通讯地址",
    invoiceTitle: "发票抬头",
    invoice: "获取发票",
    werun: "微信运动步数",
    record: "录音功能",
    writePhotosAlbum: "保存到相册",
    camera: "摄像头",
};
var ensureAuthScope = function (scope, message) { return __awaiter(void 0, void 0, void 0, function () {
    var authSetting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSetting()];
            case 1:
                authSetting = (_a.sent()).authSetting;
                if (!(scope && authSetting["scope." + scope] === true)) return [3 /*break*/, 2];
                return [2 /*return*/, authSetting];
            case 2:
                if (!(authSetting["scope." + scope] === void 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, authorize({
                        scope: "scope." + scope,
                    })];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [4 /*yield*/, showModal({
                    title: "权限申请",
                    content: message ||
                        "\u68C0\u6D4B\u5230\u5C0F\u7A0B\u5E8F\u5DF2\u5173\u95ED" + (SCOPE_MESSAGE[scope] || "相关") + "\u6743\u9650,\u662F\u5426\u524D\u5F80\u6253\u5F00?",
                    confirmText: "打开",
                })
                    .then(function (res) {
                    if (res.confirm) {
                        return openSetting();
                    }
                    else {
                        throw new Error("未授权,用户已取消!");
                    }
                })
                    .then(function (res) {
                    var _auth = res.authSetting;
                    if (_auth && _auth["scope." + scope]) {
                        return _auth;
                    }
                    else {
                        throw new Error("用户未授权");
                    }
                })];
            case 5: return [2 /*return*/, _a.sent()];
        }
    });
}); };

/**
 * 获取系统信息
 * @returns {Taro.getSystemInfoSync.Result} 当前设备系统信息
 */
var systemInfo;
var getSystemInfoSync = function () {
    if (systemInfo == null) {
        systemInfo = getSystemInfoSync$1();
    }
    return systemInfo;
};
/**
 *
 * 获取菜单按钮的布局位置信息
 * @returns {Taro.getMenuButtonBoundingClientRect.Rect} 菜单按钮的布局位置信息
 */
var menuButtonRect;
var getMenuButtonBoundingClientRect = function () {
    if (menuButtonRect == null) {
        menuButtonRect = getMenuButtonBoundingClientRect$1();
    }
    return menuButtonRect;
};

export { ensureAuthScope, getCurrPages, getMenuButtonBoundingClientRect, getSystemInfoSync, goToHome, isRootPage, isTabBar, navigateBack, navigateTo, reLaunch, redirectTo, switchTab };
//# sourceMappingURL=index.js.map
