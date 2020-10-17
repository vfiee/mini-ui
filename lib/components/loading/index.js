import { __assign } from 'tslib';
import React from 'react';
import { View } from '@tarojs/components';
import { mergeStyle } from '@vyron/mini-components/lib/utils';

var defaultLoadingPorps = {
    color: "#999",
    type: "circular",
    size: "40rpx",
    vertical: false,
    textSize: "28rpx",
    block: false,
};
var dots = Array.from({ length: 12 });
var Loading = function (props) {
    var _a = __assign(__assign({}, defaultLoadingPorps), props), className = _a.className, color = _a.color, type = _a.type, size = _a.size, textSize = _a.textSize, vertical = _a.vertical, block = _a.block, style = _a.style;
    return (React.createElement(View, { className: "__loading__ " + (className || "") + " " + (vertical ? "__loading__vertical__" : "") + " " + (block ? "__loading__block__" : "") },
        React.createElement(View, { className: "__loading__" + type + "__", style: mergeStyle(style, {
                color: color,
                width: size,
                height: size,
            }) }, type === "spinner" &&
            dots.map(function (_, index) { return (React.createElement(View, { className: "__loading__spinner__dot__", key: index })); })),
        React.createElement(View, { className: "__loading__text__", style: { fontSize: textSize } }, props.children)));
};
Loading.options = {
    addGlobalClass: true,
};

export default Loading;
//# sourceMappingURL=index.js.map
