import { __assign } from 'tslib';
import React from 'react';
import { View } from '@tarojs/components';
import Icon from '@vyron/mini-components/lib/components/icon';

var defaultIcons = {
    empty: {
        size: "160rpx",
        type: "icon-empty",
        color: "#999",
    },
    error: {
        size: "160rpx",
        color: "#FF5722",
        type: "icon-network_error1",
    },
    network: {
        size: "160rpx",
        color: "red",
        type: "icon-network-error",
    },
};
var defaultEmptyProps = {
    image: "empty",
};
var defaultIconTypes = ["empty", "network", "error"];
var Empty = function (props) {
    var _a = __assign(__assign({}, defaultEmptyProps), props), image = _a.image, className = _a.className, description = _a.description, onClick = _a.onClick;
    if (typeof image === "string") {
        image = defaultIconTypes.includes(image) ? image : "empty";
    }
    var iconProps = typeof image === "string" ? defaultIcons[image] : image;
    return (React.createElement(View, { className: "__empty__ " + (className !== null && className !== void 0 ? className : ""), onClick: function (eve) { return onClick === null || onClick === void 0 ? void 0 : onClick(eve); } },
        React.createElement(Icon, __assign({}, iconProps)),
        !!description && (React.createElement(View, { className: "__empty__description__" }, description)), props === null || props === void 0 ? void 0 :
        props.children));
};
Empty.options = {
    addGlobalClass: true,
};

export default Empty;
//# sourceMappingURL=index.js.map
