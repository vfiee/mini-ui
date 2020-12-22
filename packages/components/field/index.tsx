import React, { useRef } from "react";
import { View } from "@tarojs/components";
import Icon from "components/icon";
import Cell from "components/cell";
import { compact, isFunction, isUndefined, mergeStyle, pick } from "utils";
import { useUpdate } from "hooks";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconProps, CellProps, InputProps, FieldProps } from "types";
import Input from "./baseInput";

const getIconProps = (
  props: string | IconProps | undefined,
  fn: any
): string | IconProps | undefined => {
  if (!isFunction(fn) || isUndefined(undefined)) return props;
  if (typeof props === "string") {
    return {
      type: props,
      onClick: fn
    };
  }
  return props?.onClick ? props : { ...(props as IconProps), onClick: fn };
};

const getCellProps = (props: FieldProps): CellProps => {
  const {
    style,
    colon,
    leftIcon,
    rightIcon,
    required,
    center,
    label,
    labelClass,
    labelStyle,
    labelAlign,
    inputAlign,
    onLeftIconClick,
    onRightIconClick
  } = props;
  return compact(
    {
      colon,
      required,
      center,
      style,
      title: label,
      titleStyle: labelStyle,
      titleClass: `__field__label__ ${
        labelAlign ? `__field__label__${labelAlign}__` : ""
      } ${labelClass ?? ""} `,
      valueClass: `__field__value__ ${
        inputAlign ? `__field__value__${inputAlign}__` : ""
      }`,
      icon: getIconProps(leftIcon, onLeftIconClick),
      rightIcon: getIconProps(rightIcon, onRightIconClick)
    },
    isUndefined
  ) as CellProps;
};

const getInputProps = (props: FieldProps): InputProps => {
  const {
    type,
    maxlength,
    inputClass,
    fixed,
    readonly,
    disabled,
    autoHeight,
    showConfirmBar,
    disableDefaultPadding,
    onLineChange
  } = props;
  let inputProps = pick(props, [
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
    "onKeyboardHeightChange"
  ]);
  inputProps = {
    ...inputProps,
    disabled: disabled || readonly,
    isTextarea: type === "textarea",
    password: type === "password",
    type: ["tel", "digit"].includes(type as string) ? "number" : type,
    maxlength: type === "tel" ? 11 : maxlength,
    className: `__field__control__ ${
      type === "textarea" ? "__field__textarea__" : ""
    } ${inputClass ?? ""}`
  };
  if (inputProps.isTextarea) {
    delete inputProps["type"];
    inputProps = {
      ...inputProps,
      fixed,
      autoHeight,
      showConfirmBar,
      disableDefaultPadding,
      onLineChange
    };
  }
  return compact(inputProps, isUndefined) as InputProps;
};

const getErrorProps = (props: FieldProps): object => {
  let { errorClass, errorStyle, errorAlign, errorMsg } = props;
  return compact(
    {
      style: mergeStyle(errorStyle, errorMsg ? "" : `display:none;`),
      className: `__field__error__ ${errorClass ?? ""} ${
        errorAlign ? `__field__error__${errorAlign}__` : ""
      }`
    },
    isUndefined
  );
};

const getWordLimitProps = (props: FieldProps): object => {
  const { limitClass, limitStyle } = props;
  return compact(
    {
      style: limitStyle,
      className: `__field__limit__ ${limitClass ?? ""}`
    },
    isUndefined
  );
};

const formatFn = (_value: any, fn?: Function): any => {
  return isFunction(fn) ? fn?.(_value) : _value;
};

const Field = (props: FieldProps) => {
  let { formatter, formatTrigger, disabled, readonly } = props;
  const update = useUpdate();
  let valueRef = useRef(props?.value ?? "");
  let focusRef = useRef(!!props?.focus);
  const onFocus = eve => {
    focusRef.current = true;
    props?.onFocus?.(eve);
    update();
  };
  const onBlur = eve => {
    focusRef.current = false;
    // 格式化
    if (formatTrigger === "onBlur") {
      valueRef.current = formatFn(valueRef.current, formatter);
    }
    props?.onBlur?.(eve);
    update();
  };
  const onInput = eve => {
    valueRef.current = eve.detail.value;
    // 格式化
    if (formatTrigger === "onChange") {
      valueRef.current = formatFn(valueRef.current, formatter);
    }
    if (isFunction(props.onInput)) {
      let callbackValue = (props.onInput as Function)(eve);
      if (!isUndefined(callbackValue)) {
        valueRef.current = callbackValue;
      }
    }
    // 校验
    update();
    return valueRef.current;
  };
  const _props = {
    ...props,
    onFocus,
    onBlur,
    onInput,
    value: valueRef.current
  } as FieldProps;
  const {
    showError,
    errorMsg,
    type,
    maxlength,
    clear,
    clearTrigger,
    onClear: _onClear
  } = _props;
  const cellProps = getCellProps(_props);
  const errorProps = getErrorProps(_props);
  const wordLimitProps = getWordLimitProps(_props);
  const onClear = eve => {
    valueRef.current = "";
    focusRef.current = false;
    _onClear?.(eve);
    update();
  };
  const showClear =
    !(disabled || readonly) &&
    valueRef.current.length > 0 &&
    (clearTrigger === "focus" ? focusRef.current : true);

  const fieldValue = (
    <React.Fragment>
      <View className="__field__value__body__">
        <Input {...getInputProps(_props)} />
        {clear && (
          <Icon
            type="icon-close"
            className="__field__clear__"
            style={showClear ? "" : `display:none`}
            onClick={onClear}
          />
        )}
      </View>
      {type === "textarea" && (maxlength as number) > 0 && (
        <View {...wordLimitProps}>{`${
          valueRef.current?.length ?? 0
        }/${maxlength}`}</View>
      )}
      {!!showError && <View {...errorProps}>{errorMsg}</View>}
    </React.Fragment>
  );
  return (
    <Cell
      // {...restProps}
      {...cellProps}
      className={`__field__ ${_props?.disabled ? `__field__disabled__` : ""} ${
        _props?.readonly ? `__field__readonly__` : ""
      } ${_props?.className ?? ""}`}
      value={fieldValue}
    >
      {props?.children}
    </Cell>
  );
};

Field.displayName = "Field";

Field.options = {
  addGlobalClass: true
};

Field.defaultProps = {
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
  placeholderClass: "input-placeholder"
};

export default Field;
