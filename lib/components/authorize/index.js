import { __rest, __assign, __awaiter, __generator } from 'tslib';
import React from 'react';
import { login } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import { isFunction, isPromise, ensureAuthScope } from '@vyron/mini-components/lib/utils';

var SUCCESS_MSG = {
    getPhoneNumber: "getPhoneNumber:ok",
    getUserInfo: "getUserInfo:ok",
};
function getService(service, param) {
    if (param === void 0) { param = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, params, fn, needMiniCode, codeKey, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (service === void 0) {
                        throw "service is undefined!";
                    }
                    if (isPromise(service)) {
                        return [2 /*return*/, service(param)];
                    }
                    _a = service, params = _a.params, fn = _a.fn, needMiniCode = _a.needMiniCode, codeKey = _a.codeKey;
                    params = __assign(__assign({}, params), param);
                    if (!needMiniCode) return [3 /*break*/, 2];
                    _b = params;
                    _c = codeKey || "code";
                    return [4 /*yield*/, login()];
                case 1:
                    _b[_c] = _d.sent();
                    _d.label = 2;
                case 2: return [2 /*return*/, fn(params)];
            }
        });
    });
}
function onGetPhoneNumber(eve) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, errMsg, rest, userinfo, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = eve.detail, errMsg = _a.errMsg, rest = __rest(_a, ["errMsg"]);
                    if (errMsg !== SUCCESS_MSG.getPhoneNumber) {
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getService(this.service, rest)];
                case 2:
                    userinfo = _b.sent();
                    // dispatch({type:"userinfo/update",payload:{userinfo}});
                    onSuccess.bind(this, userinfo, eve)();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function onGetUserInfo(eve) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, errMsg, rest, userinfo, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = eve.detail, errMsg = _a.errMsg, rest = __rest(_a, ["errMsg"]);
                    if (errMsg !== SUCCESS_MSG.getUserInfo) {
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getService(this.service, rest)];
                case 2:
                    userinfo = _b.sent();
                    // dispatch({type:"userinfo/update",payload:{userinfo}});
                    onSuccess.bind(this, userinfo, eve)();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function authorizeScope(eve) {
    var _this = this;
    ensureAuthScope(this.authScope)
        .then(function () {
        _this.onAuthorize && _this.onAuthorize(eve);
    })
        .catch(function () {
        console.log("\u672A\u6388\u6743:" + _this.authScope);
    });
}
function onSuccess() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    isFunction(this.onAuthorize) && this.onAuthorize.apply(this, args);
}
var Authorize = function (props) {
    var authorize = props.authorize, onAuthorize = props.onAuthorize, _a = props.className, className = _a === void 0 ? "" : _a, openType = props.openType, rest = __rest(props, ["authorize", "onAuthorize", "className", "openType"]);
    function onClick(eve) {
        if (!openType)
            return;
        var openTypeFns = {
            contact: onSuccess.bind(props),
            launchApp: onSuccess.bind(props),
            scope: authorizeScope.bind(props),
            getUserInfo: onGetUserInfo.bind(props),
            getPhoneNumber: onGetPhoneNumber.bind(props),
        };
        if (!isFunction(openTypeFns[openType]))
            return;
        openTypeFns[openType](eve);
    }
    return (React.createElement(React.Fragment, null, !authorize ? (
    // @ts-ignore
    React.createElement(Button, __assign({}, rest, { openType: openType, onClick: onClick, onContact: onClick, onLaunchapp: onClick, onGetUserInfo: onClick, onGetPhoneNumber: onClick, className: "__authorize__ " + className }), props === null || props === void 0 ? void 0 : props.children)) : (
    // @ts-ignore
    React.createElement(Button, __assign({}, rest, { openType: "", onClick: function (eve) { return onAuthorize && onAuthorize(eve); }, className: "__authorize__ " + className }), props === null || props === void 0 ? void 0 : props.children))));
};
Authorize.options = {
    addGlobalClass: true,
};

export default Authorize;
//# sourceMappingURL=index.js.map
