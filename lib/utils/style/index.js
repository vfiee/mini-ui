import kebabCase from 'lodash.kebabcase';

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

export { mergeStyle };
//# sourceMappingURL=index.js.map
