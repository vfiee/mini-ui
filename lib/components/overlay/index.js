import { __assign } from 'tslib';
import React from 'react';
import { View } from '@tarojs/components';
import { useMenuButton } from '@vyron/mini-components/lib/hooks';
import { mergeStyle } from '@vyron/mini-components/lib/utils';
import Transition from '@vyron/mini-components/lib/components/transition';

var defaultOverlayProps = {
    show: false,
    zIndex: 1,
    opacity: 0.6,
    duration: 0.3,
    className: "",
    preventScroll: true,
    customAppbar: false,
};
var Overlay = function (props) {
    var _a;
    var _b = __assign(__assign({}, defaultOverlayProps), props), show = _b.show, style = _b.style, zIndex = _b.zIndex, onClick = _b.onClick, opacity = _b.opacity, duration = _b.duration, className = _b.className, preventScroll = _b.preventScroll, customAppbar = _b.customAppbar;
    var wrapStyle = useMenuButton().wrapStyle;
    var _mergeStyle = mergeStyle({
        zIndex: zIndex,
        transitionDuration: typeof duration === "string" ? duration : duration + "s",
        backgroundColor: "rgba(0,0,0," + opacity + ")",
    }, style);
    if (customAppbar) {
        _mergeStyle += " top:" + ((_a = wrapStyle === null || wrapStyle === void 0 ? void 0 : wrapStyle.height) !== null && _a !== void 0 ? _a : 0) + ";";
    }
    return (React.createElement(Transition, { show: show, name: "fade" },
        React.createElement(View, { onClick: onClick, style: _mergeStyle, className: "__overlay__ " + className, onTouchMove: function (eve) {
                preventScroll && eve.stopPropagation();
            } }, props.children)));
};

export default Overlay;
//# sourceMappingURL=index.js.map
