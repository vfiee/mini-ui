import { __assign, __rest } from 'tslib';
import React from 'react';
import { CoverView } from '@tarojs/components';
import Icon from '@vyron/mini-components/lib/components/icon';
import { useMenuButton } from '@vyron/mini-components/lib/hooks';
import { goToHome, navigateBack, getCurrPages, mergeStyle } from '@vyron/mini-components/lib/utils';
import BackBlack from '../../assets/images/back-black-icon.png';
import BackWhite from '../../assets/images/back-white-icon.png';
import HomeBlack from '../../assets/images/home-black-icon.png';
import HomeWhite from '../../assets/images/home-white-icon.png';
import MenuBlack from '../../assets/images/menu-black-icon.png';
import MenuWhite from '../../assets/images/menu-white-icon.png';

var getTitleProps = function (props) {
    return typeof props === "string" ? { text: props } : props;
};
var defaultHomeIconProps = {
    isCover: true,
    localImage: true,
    style: {
        width: "34rpx",
        height: "34rpx",
    },
};
var defaultBackIconProps = {
    isCover: true,
    localImage: true,
    style: {
        width: "18rpx",
        height: "30rpx",
    },
};
var defaultMenuIconProps = {
    isCover: true,
    localImage: true,
    style: {
        width: "34rpx",
        height: "25rpx",
    },
};
var defaultNavigationBarProps = {
    title: "微信",
    type: "white",
    backgroundColor: "#ffffff",
    // statusBarBackgroundColor: "#ffffff",
    left: {
        home: {
            white: __assign(__assign({}, defaultHomeIconProps), { type: HomeWhite }),
            black: __assign(__assign({}, defaultHomeIconProps), { type: HomeBlack }),
        },
        back: {
            white: __assign(__assign({}, defaultBackIconProps), { type: BackWhite }),
            black: __assign(__assign({}, defaultBackIconProps), { type: BackBlack }),
        },
    },
    right: {
        menu: {
            white: __assign(__assign({}, defaultMenuIconProps), { type: MenuWhite }),
            black: __assign(__assign({}, defaultMenuIconProps), { type: MenuBlack }),
        },
    },
    onLeftClick: function (_a) {
        var isHome = _a.isHome;
        isHome ? goToHome() : navigateBack();
    },
};
var AppBar = function (props) {
    var _a = __assign(__assign({}, defaultNavigationBarProps), props), type = _a.type, title = _a.title, left = _a.left, right = _a.right, middle = _a.middle, backgroundColor = _a.backgroundColor, onTitleClick = _a.onTitleClick, onLeftClick = _a.onLeftClick, onRightClick = _a.onRightClick;
    var _b = useMenuButton({
        type: type,
    }), rect = _b.rect, wrapStyle = _b.wrapStyle, menuStyle = _b.menuStyle, delimiterStyle = _b.delimiterStyle;
    var width = menuStyle.width, height = menuStyle.height;
    var position = wrapStyle.position, zIndex = wrapStyle.zIndex, restProps = __rest(wrapStyle, ["position", "zIndex"]);
    var _c = getCurrPages(), isHome = _c.isFirst, isTabBar = _c.isTabBar;
    var _d = getTitleProps(title || {}), text = _d.text, titleStyle = _d.style, titleCls = _d.className, restTitleProps = __rest(_d, ["text", "style", "className"]);
    var _e = left, home = _e.home, back = _e.back, leftCls = _e.className, restLeftProps = __rest(_e, ["home", "back", "className"]);
    var _f = right, menu = _f.menu, rightCls = _f.className, restRightProps = __rest(_f, ["menu", "className"]);
    var _g = (middle !== null && middle !== void 0 ? middle : {}), delimiterCls = _g.className, delimiterSty = _g.style;
    var leftIconProps = isHome ? home : back;
    var menuClickProps = { isHome: isHome, menuStyle: menuStyle, rect: rect, props: left };
    return (React.createElement(React.Fragment, null,
        React.createElement(CoverView, { style: __assign(__assign({}, wrapStyle), { backgroundColor: backgroundColor }), className: "__appbar__" },
            React.createElement(CoverView, { style: menuStyle, className: "__left__menu__ " + (isTabBar ? "__left__menu__hidden__" : "") },
                React.createElement(CoverView, __assign({}, restLeftProps, { className: "__menu__item__wrap__ " + (leftCls !== null && leftCls !== void 0 ? leftCls : ""), onClick: function (eve) { return onLeftClick === null || onLeftClick === void 0 ? void 0 : onLeftClick(menuClickProps, eve); } }),
                    React.createElement(Icon, __assign({}, leftIconProps === null || leftIconProps === void 0 ? void 0 : leftIconProps[type]))),
                React.createElement(CoverView, { className: "__delimiter__ " + (delimiterCls !== null && delimiterCls !== void 0 ? delimiterCls : ""), style: mergeStyle(delimiterStyle, delimiterSty) }),
                React.createElement(CoverView, __assign({}, restRightProps, { className: "__menu__item__wrap__ " + (rightCls !== null && rightCls !== void 0 ? rightCls : ""), onClick: function (eve) { return onRightClick === null || onRightClick === void 0 ? void 0 : onRightClick(menuClickProps, eve); } }),
                    React.createElement(Icon, __assign({}, menu === null || menu === void 0 ? void 0 : menu[type])))),
            React.createElement(CoverView, __assign({}, restTitleProps, { className: "__appbar__title__ " + (titleCls !== null && titleCls !== void 0 ? titleCls : ""), style: mergeStyle({
                    color: backgroundColor === "#ffffff" ? "#333" : "#fff",
                }, titleStyle), onClick: function (eve) { return onTitleClick === null || onTitleClick === void 0 ? void 0 : onTitleClick(eve); } }), text),
            React.createElement(CoverView, { style: { width: width, height: height }, className: "__right__menu__ " + (isTabBar ? "__right__menu__hidden__" : "") })),
        React.createElement(CoverView, { style: restProps })));
};
AppBar.options = {
    addGlobalClass: true,
};

export default AppBar;
//# sourceMappingURL=index.js.map
