import React, { useMemo, isValidElement } from "react";
import { View } from "@tarojs/components";
import Icon from "components/icon";
import { isFunction, isNull, isUndefined, navigateTo, redirectTo } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconProps, CellProps, CellGroupProps } from "types";

const Cell = (props: CellProps) => {
  const {
    title,
    colon,
    titleClass,
    titleStyle,
    value,
    valueClass,
    valueStyle,
    label,
    labelClass,
    labelStyle,
    icon,
    rightIcon,
    url,
    replace,
    required,
    arrow,
    arrowDirection,
    center,
    className,
    onClick,
    border,
    ...restProps
  } = props;

  const _label = useMemo(() => {
    if (isUndefined(label)) return null;
    return (
      <View
        className={`__cell__label__ ${labelClass ?? ""}`}
        style={labelStyle ?? ""}
      >
        {label}
      </View>
    );
  }, [label, labelClass, labelStyle]);

  const _icon = useMemo(() => {
    if (isUndefined(icon)) return null;
    let _iconProps = (typeof icon === "string"
      ? { type: icon }
      : icon) as IconProps;
    return isValidElement(icon) ? (
      icon
    ) : (
      <Icon
        {..._iconProps}
        className={`__cell__left__icon__ ${_iconProps?.className ?? ""}`}
      />
    );
  }, [icon]);

  const _rightIcon = useMemo(() => {
    if (isUndefined(rightIcon) && !arrow) return null;
    let _iconProps = (typeof rightIcon === "string"
      ? { type: rightIcon }
      : rightIcon) as IconProps;
    if (arrow) {
      _iconProps = {
        type: "back",
        className: `__cell__icon__arrow__ ${arrowDirection ?? ""}`,
      };
    }
    return isValidElement(rightIcon) ? (
      rightIcon
    ) : (
      <Icon
        {..._iconProps}
        className={`__cell__right__icon__ ${_iconProps?.className ?? ""}`}
      />
    );
  }, [arrow, arrowDirection, rightIcon]);

  const _title = useMemo(() => {
    if (isUndefined(title)) return null;
    return (
      <View
        style={titleStyle ?? ""}
        className={`__cell__title__ ${titleClass ?? ""}`}
      >
        {title}
        {colon ? ":" : ""}
        {_label}
      </View>
    );
  }, [_label, colon, title, titleClass, titleStyle]);

  const _value = useMemo(() => {
    return (
      <View
        className={`__cell__value__ ${
          isNull(_title) ? "__cell__value__only__" : ""
        } ${valueClass ?? ""}`}
        style={valueStyle ?? ""}
      >
        {value}
      </View>
    );
  }, [_title, value, valueClass, valueStyle]);

  return (
    <View
      {...restProps}
      onClick={(eve) => {
        const isUrl = typeof url === "string";
        if (isFunction(onClick)) {
          // @ts-ignore
          isUrl ? onClick({ replace, url }, eve) : onClick(eve);
        }
        if (!isUrl) return;
        // @ts-ignore
        replace ? redirectTo(url) : navigateTo({ url });
      }}
      className={`__cell__  ${required ? "__cell__required__" : ""} ${
        border ? "__cell__border__" : ""
      } ${center ? "__cell__center__" : ""} ${className ?? ""}`}
    >
      {_icon}
      {_title}
      {_value}
      {_rightIcon}
      {props?.children}
    </View>
  );
};

Cell.displayName = "Col";

Cell.options = {
  addGlobalClass: true,
};

Cell.defaultProps = {
  colon: false,
  replace: false,
  center: false,
  arrow: false,
  border: true,
  arrowDirection: "right",
};

const CellGroup = (props: CellGroupProps) => {
  const {
    title,
    titleClass,
    titleStyle,
    border,
    className,
    ...restProps
  } = props;

  const cellGroup = useMemo(
    () => (
      <View
        {...restProps}
        className={`__cell__group__ ${border ? "border-top-bottom" : ""} ${
          className ?? ""
        }`}
      >
        {props?.children}
      </View>
    ),
    [border, className, props, restProps]
  );

  const titleComponent = useMemo(() => {
    if (isUndefined(title)) return null;
    return !isValidElement(title) ? (
      <View
        style={titleStyle}
        className={`__cell__group__title__ ${titleClass ?? ""}`}
      >
        {title}
      </View>
    ) : (
      title
    );
  }, [title, titleClass, titleStyle]);

  return title ? (
    <React.Fragment>
      {titleComponent}
      {cellGroup}
    </React.Fragment>
  ) : (
    cellGroup
  );
};

CellGroup.displayName = "CellGroup";

CellGroup.options = {
  addGlobalClass: true,
};

CellGroup.defaultProps = {
  border: true,
};

export { Cell as default, CellGroup };