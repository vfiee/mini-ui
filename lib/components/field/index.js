import { __rest, __assign } from 'tslib';
import React, { useRef } from 'react';
import { Textarea, Input, View } from '@tarojs/components';
import Icon from '@vyron/mini-components/lib/components/icon';
import Cell from '@vyron/mini-components/lib/components/cell';
import { compact, isUndefined, mergeStyle, isFunction, pick } from '@vyron/mini-components/lib/utils';
import { useUpdate } from '@vyron/mini-components/lib/hooks';

var BaseInput = function (props) {
    var isTextarea = props.isTextarea, rest = __rest(props, ["isTextarea"]);
    var Component = isTextarea ? Textarea : Input;
    return React.createElement(Component, __assign({}, rest));
};

var defaultFieldProps = {
    type: "text",
    fixed: false,
    autoHeight: true,
    maxlength: 200,
    showConfirmBar: false,
    disableDefaultPadding: true,
    clear: false,
    clearTrigger: "focus",
    showWordLimit: false,
    inputAlign: "left",
    showError: true,
    formatTriggleType: "onChange",
    placeholderClass: "input-placeholder",
};
var getIconProps = function (props, fn) {
    if (!isFunction(fn) || isUndefined(undefined))
        return props;
    if (typeof props === "string") {
        return {
            type: props,
            onClick: fn,
        };
    }
    return (props === null || props === void 0 ? void 0 : props.onClick) ? props : __assign(__assign({}, props), { onClick: fn });
};
var getCellProps = function (props) {
    var colon = props.colon, leftIcon = props.leftIcon, rightIcon = props.rightIcon, required = props.required, center = props.center, label = props.label, labelClass = props.labelClass, labelStyle = props.labelStyle, labelAlign = props.labelAlign, inputAlign = props.inputAlign, onLeftIconClick = props.onLeftIconClick, onRightIconClick = props.onRightIconClick;
    return compact({
        colon: colon,
        required: required,
        center: center,
        title: label,
        titleStyle: labelStyle,
        titleClass: "__field__label__ " + (labelAlign ? "__field__label__" + labelAlign + "__" : "") + " " + (labelClass !== null && labelClass !== void 0 ? labelClass : "") + " ",
        valueClass: "__field__value__ " + (inputAlign ? "__field__value__" + inputAlign + "__" : ""),
        icon: getIconProps(leftIcon, onLeftIconClick),
        rightIcon: getIconProps(rightIcon, onRightIconClick),
    }, isUndefined);
};
var getInputProps = function (props) {
    var type = props.type, maxlength = props.maxlength, inputClass = props.inputClass, fixed = props.fixed, readonly = props.readonly, disabled = props.disabled, autoHeight = props.autoHeight, showConfirmBar = props.showConfirmBar, disableDefaultPadding = props.disableDefaultPadding, onLineChange = props.onLineChange;
    var inputProps = pick(props, [
        // input
        "value",
        "placeholder",
        "placeholderClass",
        "placeholderStyle",
        "cursorSpacing",
        "focus",
        "confirmType",
        "confirmHold",
        "alwaysEmbed",
        "cursor",
        "selectionStart",
        "selectionEnd",
        "adjustPosition",
        "holdKeyboard",
        "inputStyle",
        "onInput",
        "onFocus",
        "onBlur",
        "onConfirm",
        "onKeyboardHeightChange",
    ]);
    inputProps = __assign(__assign({}, inputProps), { disabled: disabled || readonly, isTextarea: type === "textarea", password: type === "password", type: type === "tel" ? "number" : type, maxlength: type === "tel" ? 11 : maxlength, className: "__field__control__ " + (type === "textarea" ? "__field__textarea__" : "") + " " + (inputClass !== null && inputClass !== void 0 ? inputClass : "") });
    if (inputProps.isTextarea) {
        delete inputProps["type"];
        inputProps = __assign(__assign({}, inputProps), { fixed: fixed,
            autoHeight: autoHeight,
            showConfirmBar: showConfirmBar,
            disableDefaultPadding: disableDefaultPadding,
            onLineChange: onLineChange });
    }
    return compact(inputProps, isUndefined);
};
var getErrorProps = function (props) {
    var errorClass = props.errorClass, errorStyle = props.errorStyle, errorAlign = props.errorAlign, errorMsg = props.errorMsg;
    return compact({
        style: mergeStyle(errorStyle, errorMsg ? "" : "display:none;"),
        className: "__field__error__ " + (errorClass !== null && errorClass !== void 0 ? errorClass : "") + " " + (errorAlign ? "__field__error__" + errorAlign + "__" : ""),
    }, isUndefined);
};
var getWordLimitProps = function (props) {
    var limitClass = props.limitClass, limitStyle = props.limitStyle;
    return compact({
        style: limitStyle,
        className: "__field__limit__ " + (limitClass !== null && limitClass !== void 0 ? limitClass : ""),
    }, isUndefined);
};
var formatFn = function (_value, fn) {
    return isFunction(fn) ? fn === null || fn === void 0 ? void 0 : fn(_value) : _value;
};
var Field = function (props) {
    var _a, _b, _c, _d;
    var formatter = props.formatter, formatTrigger = props.formatTrigger, disabled = props.disabled, readonly = props.readonly;
    var update = useUpdate();
    var valueRef = useRef((_a = props === null || props === void 0 ? void 0 : props.value) !== null && _a !== void 0 ? _a : "");
    var focusRef = useRef(!!(props === null || props === void 0 ? void 0 : props.focus));
    var onFocus = function (eve) {
        var _a;
        focusRef.current = true;
        (_a = props === null || props === void 0 ? void 0 : props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, eve);
        update();
    };
    var onBlur = function (eve) {
        var _a;
        focusRef.current = false;
        // 格式化
        if (formatTrigger === "onBlur") {
            valueRef.current = formatFn(valueRef.current, formatter);
        }
        (_a = props === null || props === void 0 ? void 0 : props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, eve);
        update();
    };
    var onInput = function (eve) {
        valueRef.current = eve.detail.value;
        // 格式化
        if (formatTrigger === "onChange") {
            valueRef.current = formatFn(valueRef.current, formatter);
        }
        if (isFunction(props.onInput)) {
            var callbackValue = props.onInput(eve);
            if (!isUndefined(callbackValue)) {
                valueRef.current = callbackValue;
            }
        }
        // 校验
        update();
        return valueRef.current;
    };
    var _props = __assign(__assign(__assign({}, defaultFieldProps), props), { onFocus: onFocus,
        onBlur: onBlur,
        onInput: onInput, value: valueRef.current });
    var showError = _props.showError, errorMsg = _props.errorMsg, type = _props.type, maxlength = _props.maxlength, clear = _props.clear, clearTrigger = _props.clearTrigger, _onClear = _props.onClear;
    var cellProps = getCellProps(_props);
    var errorProps = getErrorProps(_props);
    var wordLimitProps = getWordLimitProps(_props);
    var onClear = function (eve) {
        valueRef.current = "";
        focusRef.current = false;
        _onClear === null || _onClear === void 0 ? void 0 : _onClear(eve);
        update();
    };
    var showClear = !(disabled || readonly) &&
        valueRef.current.length > 0 &&
        (clearTrigger === "focus" ? focusRef.current : true);
    var fieldValue = (React.createElement(React.Fragment, null,
        React.createElement(View, { className: "__field__value__body__" },
            React.createElement(BaseInput, __assign({}, getInputProps(_props))),
            clear && (React.createElement(Icon, { type: "close-filled", className: "__field__clear__", style: showClear ? "" : "display:none", onClick: onClear }))),
        type === "textarea" && maxlength > 0 && (React.createElement(View, __assign({}, wordLimitProps), ((_c = (_b = valueRef.current) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) + "/" + maxlength)),
        !!showError && React.createElement(View, __assign({}, errorProps), errorMsg)));
    return (React.createElement(Cell, __assign({}, cellProps, { className: "__field__ " + ((_props === null || _props === void 0 ? void 0 : _props.disabled) ? "__field__disabled__" : "") + " " + ((_props === null || _props === void 0 ? void 0 : _props.readonly) ? "__field__readonly__" : "") + " " + ((_d = _props === null || _props === void 0 ? void 0 : _props.className) !== null && _d !== void 0 ? _d : ""), value: fieldValue }), props === null || props === void 0 ? void 0 : props.children));
};

export default Field;
//# sourceMappingURL=index.js.map
