import { __assign, __rest } from 'tslib';
import React from 'react';
import { View } from '@tarojs/components';

var defaultEmptyProps = {
    text: "",
    hairLine: true,
    contentPosition: "center",
};
var Divider = function (props) {
    var _a = __assign(__assign({}, defaultEmptyProps), props), hairLine = _a.hairLine, contentPosition = _a.contentPosition, text = _a.text, _b = _a.className, className = _b === void 0 ? "" : _b, dividerProps = __rest(_a, ["hairLine", "contentPosition", "text", "className"]);
    return (React.createElement(View, __assign({}, dividerProps, { className: "__divider__ " + (hairLine ? "__divider__hairline" : "") + " " + (!!text ? "__divider__position__" + contentPosition : "") + " " + className }), text));
};
Divider.options = {
    addGlobalClass: true,
};

export default Divider;
//# sourceMappingURL=index.js.map
