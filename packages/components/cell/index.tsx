import React, { useMemo, isValidElement } from "react";
import { View, Text } from "@tarojs/components";
import Icon from "components/icon";
import { isNull, isUndefined, navigateTo, redirectTo } from "utils";
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

  const isValidUrl = typeof url === "string" && url != "";

  const cellLabel = useMemo(() => {
    if (isUndefined(label)) return null;
    return isValidElement(label) ? (
      label
    ) : (
      <View
        className={`__cell__label__ ${labelClass ?? ""}`}
        style={labelStyle ?? ""}
      >
        {label}
      </View>
    );
  }, [label, labelClass, labelStyle]);

  const prefixIcon = useMemo(() => {
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

  const suffixIcon = useMemo(() => {
    if (isUndefined(rightIcon) && !arrow && !isValidUrl) return null;
    let _iconProps = (typeof rightIcon === "string"
      ? { type: rightIcon }
      : rightIcon) as IconProps;
    if (arrow || isValidUrl) {
      _iconProps = {
        type: "icon-back",
        className: `__cell__icon__arrow__ ${arrowDirection ?? ""}`
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
  }, [arrow, arrowDirection, isValidUrl, rightIcon]);

  const cellTitle = useMemo(() => {
    if (isUndefined(title)) return null;
    return (
      <View
        style={titleStyle ?? ""}
        className={`__cell__title__ ${titleClass ?? ""}`}
      >
        {title}
        {!!colon && (
          <Text className="__cell__colon__">
            {typeof colon === "string" ? colon : ":"}
          </Text>
        )}
        {cellLabel}
      </View>
    );
  }, [cellLabel, colon, title, titleClass, titleStyle]);

  const cellContent = useMemo(() => {
    return (
      <View
        className={`__cell__value__ ${
          isNull(cellTitle) ? "__cell__value__only__" : ""
        } ${valueClass ?? ""}`}
        style={valueStyle ?? ""}
      >
        {value}
      </View>
    );
  }, [cellTitle, value, valueClass, valueStyle]);

  const cellCls = useMemo(() => {
    const clsArr = [
      { value: border, suffix: "border" },
      { value: required, suffix: "required" },
      { value: center, suffix: "center" }
    ];
    let finnalCls = clsArr.map(cls => {
      if (cls.value) {
        return `__cell__${cls.suffix}__`;
      }
    });
    className && finnalCls.push(className);
    return finnalCls.join(" ");
  }, [required, border, center, className]);

  return (
    <View
      {...restProps}
      onClick={eve => {
        if (isValidUrl) {
          // @ts-ignore
          replace ? redirectTo(url) : navigateTo({ url });
        }
        onClick?.(eve);
      }}
      className={`__cell__ ${cellCls}`}
    >
      {prefixIcon}
      {cellTitle}
      {!isValidUrl && cellContent}
      {suffixIcon}
      {props?.children}
    </View>
  );
};

Cell.displayName = "Col";

Cell.options = {
  addGlobalClass: true
};

Cell.defaultProps = {
  colon: false,
  replace: false,
  center: false,
  arrow: false,
  border: true,
  arrowDirection: "right"
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
  addGlobalClass: true
};

CellGroup.defaultProps = {
  border: true
};

export { Cell as default, CellGroup };
