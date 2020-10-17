import { __assign, __awaiter, __generator, __rest } from 'tslib';
import qs from 'qs';
export { default as get } from 'lodash.get';
import kebabCase from 'lodash.kebabcase';
export { default as kebabcase } from 'lodash.kebabcase';
import { getCurrentPages, navigateTo as navigateTo$1, redirectTo as redirectTo$1, navigateBack as navigateBack$1, switchTab as switchTab$1, reLaunch as reLaunch$1, showModal, openSetting, authorize, getSetting, getSystemInfoSync as getSystemInfoSync$1, getMenuButtonBoundingClientRect as getMenuButtonBoundingClientRect$1, createSelectorQuery } from '@tarojs/taro';

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

var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * @param {any} target 检测的值
 * @returns {boolean} 返回布尔值,`true`表示是数组,`false`表示不是数组
 *
 */
var isArray = Array.isArray;
/**
 * 检测当前值是否为buffer类型
 * @params {any} value 检测的值
 * @returns {boolean} 返回boolean
 *
 */
var isBuffer = Buffer ? Buffer.isBuffer : function (_value) { return false; };
/**
 * 获取任意值的字符串类型
 * @param {any} value 转换为字符串的数据
 * @returns {string} 返回 Object.prototype.toString.call(value) 的值
 *
 */
var toString = function (value) {
    return objectProto.toString.call(value);
};
/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回 value的数据类型,如 string object function null undefined number ....
 *
 */
var getTypeof = function (value) {
    return toString(value).slice(8, -1);
};
/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
var isNull = function (value) { return value === null; };
/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
var isUndefined = function (value) {
    return typeof value === "undefined";
};
/**
 * 判断当前值是否为对象
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isObject = function (value) {
    return value != null && typeof value === "object";
};
/**
 * 检测当前值是否为Map类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isMap = function (value) { return getTypeof(value) === "Map"; };
/**
 * 检测当前值是否为WeakMap类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isWeakMap = function (value) {
    return getTypeof(value) === "WeakMap";
};
/**
 * 检测当前值是否为Set类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isSet = function (value) { return getTypeof(value) === "Set"; };
/**
 * 检测当前值是否为WeakSet类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isWeakSet = function (value) {
    return getTypeof(value) === "WeakSet";
};
/**
 * 检测当前值是否为Function类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isFunction = function (value) {
    return getTypeof(value) === "Function";
};
/**
 * 检测当前值是否为GeneratorFunction类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isGeneratorFunction = function (value) {
    return getTypeof(value) === "GeneratorFunction";
};
/**
 * 检测当前值是否为Promise类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isPromise = function (value) {
    return getTypeof(value) === "Promise";
};
/**
 * 检测当前值是否为RegExp类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isRegExp = function (value) { return getTypeof(value) === "RegExp"; };
/**
 * 检测当前值是否为Boolean类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isBoolean = function (value) {
    return typeof value === "boolean" || getTypeof(value) === "Boolean";
};
/**
 * 检测当前值是否为Arguments类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isArguments = function (value) {
    return (isObject(value) &&
        hasOwnProperty.call(value, "callee") &&
        objectProto.propertyIsEnumerable("callee") &&
        isFunction(value.callee));
};
/**
 * 检测当前值是否为Symbol类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isSymbol = function (value) { return getTypeof(value) === "Symbol"; };
/**
 * 检测当前值是否为空
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isEmpty = function (value) {
    if (value == null)
        return true;
    if (typeof value === "string" ||
        isArray(value) ||
        isBuffer(value) ||
        isArguments(value)) {
        return !value.length;
    }
    if (isSet(value) || isMap(value)) {
        return !value.size;
    }
    for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
};
/**
 * 过滤掉目标对象中的被Boolean转为false的值
 * @param { [] | object } value
 * @param {(arg: any) => boolean} fn 每次过滤执行的函数
 * @returns { [] | object } 返回过滤后的值
 */
function compact(value, fn, deep) {
    if (deep === void 0) { deep = false; }
    var predicate = fn || Boolean;
    if (isArray(value)) {
        return value.filter(predicate);
    }
    if (!isObject(value))
        return value;
    var keys = Object.keys(value);
    if (keys.length <= 0)
        return value;
    var res = {};
    for (var i = 0, len = keys.length; i < len; i++) {
        var item = value[keys[i]];
        if (deep && (isArray(item) || isObject(item))) {
            res[keys[i]] = compact(item, predicate);
        }
        else if (!predicate(item)) {
            res[keys[i]] = item;
        }
    }
    return res;
}
/**
 *
 * 遍历对象并返回对象可枚举属性组成的数组
 * @param {object} value 遍历对象
 * @returns {string[]} 返回对象的自身可枚举属性组成的数组
 *
 */
var keys = Object.keys;
/**
 * 遍历对象并返回对象可枚举属性值组成的数组
 * @param {object} value 遍历对象
 * @returns {any[]} 返回对象的自身可枚举属性值组成的数组
 *
 */
var values = Object.values;
var forEach = function (value, callback, thisArg) {
    if (isArray(value)) {
        return value.forEach(callback, thisArg);
    }
    else if (isObject(value) && keys(value).length > 0) {
        return foreachObject(value, callback, thisArg);
    }
};
/**
 * 遍历对象并执行回调
 * @param {BaseObject} object 遍历的对象
 * @param {ForEachCallback} callback 遍历执行的回调函数
 * @param {any} thisArg 回调函数作用域
 */
var foreachObject = function (object, callback, thisArg) {
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            callback.call(thisArg, object[key], key, object);
        }
    }
};
function pick(object, props) {
    var _a;
    var res = {};
    if (isEmpty(object))
        return res;
    if (typeof props === "string") {
        return hasOwnProperty.call(object, props)
            ? (_a = {}, _a[props] = object[props], _a) : res;
    }
    else if (isArray(props) && props.length > 0) {
        forEach(props, function (value) {
            if (hasOwnProperty.call(object, value)) {
                res[value] = object[value];
            }
        });
    }
    else if (isFunction(props)) {
        forEach(object, function (value, key) {
            if (props(value, key)) {
                res[value] = object[value];
            }
        });
    }
    return res;
}
function merge(_a, isDeep) {
    var object = _a.object, source = _a.source;
    if (isDeep === void 0) { isDeep = false; }
    if (!isDeep) {
        return Object.assign({}, object, source);
    }
    var res = {};
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            if (hasOwnProperty.call(source, key)) {
                if (isObject(object[key]) && isObject(source[key])) {
                    res[key] = merge({ object: object[key], source: source[key] }, isDeep);
                }
                res[key] = source[key];
            }
            res[key] = object[key];
        }
    }
    return res;
}

function objectToString(style) {
    if (style == null) {
        return "";
    }
    else if (typeof style === "string") {
        return style;
    }
    var res = "";
    for (var _i = 0, _a = Object.entries(style); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        res += kebabCase(key) + ": " + value + ";";
    }
    return res;
}
function mergeStyle(baseStyles, mergeStyles) {
    baseStyles = objectToString(baseStyles);
    mergeStyles = objectToString(mergeStyles);
    return baseStyles + mergeStyles;
}

var getRouterParams = function (url, params) {
    if (params === void 0) { params = {}; }
    if (typeof url !== "string" || url == "")
        return { url: url, params: params, query: "" };
    var _a = decodeURIComponent(url).split("?"), baseUrl = _a[0], query = _a[1];
    var mergeParams = __assign(__assign({}, qs.parse(query)), params);
    return {
        url: baseUrl,
        params: mergeParams,
        query: qs.stringify(mergeParams),
    };
};
/**
 *
 * @param {BaseObject} params 小程序 this.$router.params对象
 * @returns {BaseObject} 解析小程序路由参数,二维码扫描参数q,小程序码扫码参数scene
 * 其中 scene 字符串传参格式应为 key=value&key2=value2 格式
 *
 */
var getMiniParams = function (params) {
    if (isEmpty(params))
        return {};
    var _a = params.q, q = _a === void 0 ? "" : _a, _b = params.scene, scene = _b === void 0 ? "" : _b, restParams = __rest(params, ["q", "scene"]);
    return __assign(__assign(__assign({}, restParams), qs.parse(decodeURIComponent(q))), qs.parse(decodeURIComponent(scene)));
};
/**
 * 将对象转换成Map
 * @param {object} obj 转换成Map的原始对象
 * @param {BaseMap} initMap 初始Map对象,如果存在将在初始Map对象上增加属性,属性存在则覆盖
 * @returns {BaseMap} 返回转换后的Map对象
 *
 */
var objectToMap = function (obj, initMap) {
    initMap = initMap || new Map();
    if (!isObject(obj))
        return initMap;
    var keys = Object.keys(obj);
    if (keys.length === 0)
        return initMap;
    for (var i = 0, len = keys.length; i < len; i++) {
        initMap.set(keys[i], obj[keys[i]]);
    }
    return initMap;
};
/**
 * 将Map转换成对象
 * @param {BaseMap} map 转换成对象的Map
 * @param {object} initObj 初始对象,如果存在将在初始对象上增加属性,属性存在则覆盖
 * @returns {BaseMap} 返回转换后的Map对象
 *
 */
var mapToObject = function (map, initObj) {
    var res = initObj || {};
    if (!(map instanceof Map) || map.size === 0)
        return res;
    map.forEach(function (value, key) {
        res[key] = value;
    });
    return res;
};
/**
 * 下一次页面渲染前执行的方法
 * @param {Function} fn 执行的方法
 *
 */
var nextTick = function (fn) {
    setTimeout(function () {
        fn();
    }, 1000 / 30);
};
/**
 * 小程序中模拟requestAnimationFrame
 * @param {Function} cb 回调函数
 *
 */
function requestAnimationFrame(cb) {
    var _systemInfo = getSystemInfoSync();
    if (_systemInfo.platform === "devtools") {
        return nextTick(cb);
    }
    return createSelectorQuery()
        .selectViewport()
        .boundingClientRect()
        .exec(function () {
        cb();
    });
}
/**
 * 判断元素是否为组件类型(函数组件或类组件)
 * @param {React.ComponentType} Component 检测的组件
 * @returns {boolean} 返回boolean
 */
function isReactComponentType(Component) {
    if (Component == null)
        return false;
    return isFunction(Component) || !!(Component === null || Component === void 0 ? void 0 : Component.prototype.isReactComponent);
}

export { compact, ensureAuthScope, forEach, foreachObject, getCurrPages, getMenuButtonBoundingClientRect, getMiniParams, getRouterParams, getSystemInfoSync, getTypeof, goToHome, hasOwnProperty, isArguments, isArray, isBoolean, isBuffer, isEmpty, isFunction, isGeneratorFunction, isMap, isNull, isObject, isPromise, isReactComponentType, isRegExp, isRootPage, isSet, isSymbol, isTabBar, isUndefined, isWeakMap, isWeakSet, keys, mapToObject, merge, mergeStyle, navigateBack, navigateTo, nextTick, objectProto, objectToMap, pick, reLaunch, redirectTo, requestAnimationFrame, switchTab, toString, values };
//# sourceMappingURL=index.js.map
