import { __assign, __rest } from 'tslib';
import React, { useMemo } from 'react';
import { CoverView, View, CoverImage, Image } from '@tarojs/components';
import { mergeStyle } from '@vyron/mini-components/lib/utils';

var defaultIconProps = {
    isCover: false,
    fontFamily: "iconfont",
};
var Icon = function (props) {
    var _a = __assign(__assign({}, defaultIconProps), props), type = _a.type, size = _a.size, color = _a.color, style = _a.style, localImage = _a.localImage, className = _a.className, fontFamily = _a.fontFamily, isCover = _a.isCover, rest = __rest(_a, ["type", "size", "color", "style", "localImage", "className", "fontFamily", "isCover"]);
    var isImage = localImage || (type && type.indexOf("/") !== -1);
    var mergedStyle = useMemo(function () {
        return mergeStyle({
            color: color !== null && color !== void 0 ? color : "",
            fontSize: size !== null && size !== void 0 ? size : "",
        }, style);
    }, [style, color, size]);
    var CView = isCover ? CoverView : View;
    var CImage = isCover ? CoverImage : Image;
    var imageProps = {
        src: type,
        className: "__icon__origin__image__",
    };
    if (!isCover) {
        imageProps["mode"] = "aspectFill";
    }
    return (React.createElement(CView, __assign({}, rest, { style: mergedStyle, className: "__icon__ " + (isImage ? "__icon__image__" : fontFamily) + " " + (isImage ? "" : type) + " " + (className !== null && className !== void 0 ? className : "") }),
        isImage && React.createElement(CImage, __assign({}, imageProps)),
        props.children));
};
Icon.options = {
    addGlobalClass: true,
};

export default Icon;
//# sourceMappingURL=index.js.map
