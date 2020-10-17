import { __assign, __rest } from 'tslib';
import React, { useMemo, isValidElement } from 'react';
import { View } from '@tarojs/components';
import Icon from '@vyron/mini-components/lib/components/icon';
import { isUndefined, isNull, isFunction, redirectTo, navigateTo } from '@vyron/mini-components/lib/utils';

var defaultCellProps = {
    colon: false,
    replace: false,
    center: false,
    arrow: false,
    border: true,
    arrowDirection: "right",
};
var Cell = function (props) {
    var _a = __assign(__assign({}, defaultCellProps), props), title = _a.title, colon = _a.colon, titleClass = _a.titleClass, titleStyle = _a.titleStyle, value = _a.value, valueClass = _a.valueClass, valueStyle = _a.valueStyle, label = _a.label, labelClass = _a.labelClass, labelStyle = _a.labelStyle, icon = _a.icon, rightIcon = _a.rightIcon, url = _a.url, replace = _a.replace, required = _a.required, arrow = _a.arrow, arrowDirection = _a.arrowDirection, center = _a.center, className = _a.className, onClick = _a.onClick, border = _a.border, restProps = __rest(_a, ["title", "colon", "titleClass", "titleStyle", "value", "valueClass", "valueStyle", "label", "labelClass", "labelStyle", "icon", "rightIcon", "url", "replace", "required", "arrow", "arrowDirection", "center", "className", "onClick", "border"]);
    var _label = useMemo(function () {
        if (isUndefined(label))
            return null;
        return (React.createElement(View, { className: "__cell__label__ " + (labelClass !== null && labelClass !== void 0 ? labelClass : ""), style: labelStyle !== null && labelStyle !== void 0 ? labelStyle : "" }, label));
    }, [label, labelClass, labelStyle]);
    var _icon = useMemo(function () {
        var _a;
        if (isUndefined(icon))
            return null;
        var _iconProps = (typeof icon === "string"
            ? { type: icon }
            : icon);
        return isValidElement(icon) ? (icon) : (React.createElement(Icon, __assign({}, _iconProps, { className: "__cell__left__icon__ " + ((_a = _iconProps === null || _iconProps === void 0 ? void 0 : _iconProps.className) !== null && _a !== void 0 ? _a : "") })));
    }, [icon]);
    var _rightIcon = useMemo(function () {
        var _a;
        if (isUndefined(rightIcon) && !arrow)
            return null;
        var _iconProps = (typeof rightIcon === "string"
            ? { type: rightIcon }
            : rightIcon);
        if (arrow) {
            _iconProps = {
                type: "icon-back5",
                className: "__cell__icon__arrow__ " + (arrowDirection !== null && arrowDirection !== void 0 ? arrowDirection : ""),
            };
        }
        return isValidElement(rightIcon) ? (rightIcon) : (React.createElement(Icon, __assign({}, _iconProps, { className: "__cell__right__icon__ " + ((_a = _iconProps === null || _iconProps === void 0 ? void 0 : _iconProps.className) !== null && _a !== void 0 ? _a : "") })));
    }, [arrow, arrowDirection, rightIcon]);
    var _title = useMemo(function () {
        if (isUndefined(title))
            return null;
        return (React.createElement(View, { style: titleStyle !== null && titleStyle !== void 0 ? titleStyle : "", className: "__cell__title__ " + (titleClass !== null && titleClass !== void 0 ? titleClass : "") },
            title,
            colon ? ":" : "",
            _label));
    }, [_label, colon, title, titleClass, titleStyle]);
    var _value = useMemo(function () {
        return (React.createElement(View, { className: "__cell__value__ " + (isNull(_title) ? "__cell__value__only__" : "") + " " + (valueClass !== null && valueClass !== void 0 ? valueClass : ""), style: valueStyle !== null && valueStyle !== void 0 ? valueStyle : "" }, value));
    }, [_title, value, valueClass, valueStyle]);
    return (React.createElement(View, __assign({}, restProps, { onClick: function (eve) {
            var isUrl = typeof url === "string";
            if (isFunction(onClick)) {
                // @ts-ignore
                isUrl ? onClick({ replace: replace, url: url }, eve) : onClick(eve);
            }
            if (!isUrl)
                return;
            // @ts-ignore
            replace ? redirectTo(url) : navigateTo({ url: url });
        }, className: "__cell__  " + (required ? "__cell__required__" : "") + " " + (border ? "__cell__border__" : "") + " " + (center ? "__cell__center__" : "") + " " + (className !== null && className !== void 0 ? className : "") }),
        _icon,
        _title,
        _value,
        _rightIcon, props === null || props === void 0 ? void 0 :
        props.children));
};
var defaultCellGroupProps = {
    border: true,
};
var CellGroup = function (props) {
    var _a = __assign(__assign({}, defaultCellGroupProps), props), title = _a.title, titleClass = _a.titleClass, titleStyle = _a.titleStyle, border = _a.border, className = _a.className, restProps = __rest(_a, ["title", "titleClass", "titleStyle", "border", "className"]);
    var cellGroup = useMemo(function () { return (React.createElement(View, __assign({}, restProps, { className: "__cell__group__ " + (border ? "border-top-bottom" : "") + " " + (className !== null && className !== void 0 ? className : "") }), props === null || props === void 0 ? void 0 : props.children)); }, [border, className, props, restProps]);
    var titleComponent = useMemo(function () {
        if (isUndefined(title))
            return null;
        return !isValidElement(title) ? (React.createElement(View, { style: titleStyle, className: "__cell__group__title__ " + (titleClass !== null && titleClass !== void 0 ? titleClass : "") }, title)) : (title);
    }, [title, titleClass, titleStyle]);
    return title ? (React.createElement(React.Fragment, null,
        titleComponent,
        cellGroup)) : (cellGroup);
};

export default Cell;
export { CellGroup };
//# sourceMappingURL=index.js.map
