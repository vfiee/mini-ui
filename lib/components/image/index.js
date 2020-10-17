import { __assign, __rest } from 'tslib';
import React, { useState } from 'react';
import { View, Image } from '@tarojs/components';
import Icon from '@vyron/mini-components/lib/components/icon';

var defaultImageProps = {
    src: "",
    showLoading: true,
    loadingIcon: "icon-morentu",
    showError: true,
    errorIcon: "icon-error_img",
};
var Component = function (props) {
    var _a = __assign(__assign({}, defaultImageProps), props), showLoading = _a.showLoading, loadingIcon = _a.loadingIcon, loading = _a.loading, showError = _a.showError, errorIcon = _a.errorIcon, error = _a.error, round = _a.round, radius = _a.radius, width = _a.width, height = _a.height, onLoad = _a.onLoad, onError = _a.onError, className = _a.className, style = _a.style, src = _a.src, restProps = __rest(_a, ["showLoading", "loadingIcon", "loading", "showError", "errorIcon", "error", "round", "radius", "width", "height", "onLoad", "onError", "className", "style", "src"]);
    var _b = useState({
        loading: !!src,
        error: !src,
    }), status = _b[0], setStatus = _b[1];
    function _onLoad(eve) {
        setStatus({ loading: false, error: false });
        onLoad && onLoad(eve);
    }
    function _onError(eve) {
        setStatus({ loading: false, error: true });
        onError && onError(eve);
    }
    function getStyle(_style) {
        var baseStyle = {
            width: width,
            height: height,
            borderRadius: radius,
        };
        if (!_style)
            return baseStyle;
        return typeof _style === "string"
            ? "" + baseStyle + style
            : __assign(__assign({}, baseStyle), style);
    }
    return (React.createElement(View, { className: "__image__ " + (round ? "__image__round__" : "") + " " + (className || ""), style: getStyle(style) },
        !status.error && (React.createElement(Image, __assign({}, restProps, { src: src, onLoad: _onLoad, onError: _onError, className: "__image__origin__" }))),
        showLoading && status.loading && (React.createElement(View, { className: "__image__loading__" }, loading ? (loading) : (React.createElement(Icon, { type: loadingIcon, size: "32px" })))),
        showError && status.error && (React.createElement(View, { className: "__image__error__" }, error ? error : React.createElement(Icon, { type: errorIcon, size: "32px" })))));
};
Component.options = {
    addGlobalClass: true,
};

export default Component;
//# sourceMappingURL=index.js.map
