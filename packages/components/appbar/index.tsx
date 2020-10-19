import React from "react";
import { CoverView } from "@tarojs/components";
import Icon from "components/icon";
import { useMenuButton } from "hooks";
import { mergeStyle } from "utils";
import { NavigationBarProps } from "types";

const defaultNavigationBarProps: NavigationBarProps = {
  title: "",
  type: "white",
  backgroundColor: "#fff",
};

const AppBar = (props: NavigationBarProps) => {
  const {
    type,
    title,
    left,
    right,
    middle,
    backgroundColor,
    onTitleClick,
    onLeftClick,
    onRightClick,
    // viewprops
    style,
    className,
  } = {
    ...defaultNavigationBarProps,
    ...props,
  };
  const { rect, wrapStyle, menuStyle, delimiterStyle } = useMenuButton({
    type,
  });
  const { width, height } = menuStyle;
  const { position, zIndex, ...restProps } = wrapStyle;
  const { className: delimiterCls, style: delimiterSty } = middle ?? {};
  const mergeMenuStyle = !!(left && right)
    ? menuStyle
    : { ...menuStyle, backgroundColor: "transparent", borderWidth: 0 };
  return (
    <React.Fragment>
      <CoverView
        style={mergeStyle(
          {
            ...wrapStyle,
            backgroundColor,
          },
          style
        )}
        className={`__appbar__ ${className ?? ""}`}
      >
        <CoverView
          style={mergeMenuStyle}
          className={`__left__menu__ ${
            !!(left && right) ? "__left__menu__full__" : ""
          }`}
        >
          {!!left && (
            <CoverView
              className="__menu__item__wrap__"
              onClick={(eve) =>
                onLeftClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
              }
            >
              <Icon {...left} />
            </CoverView>
          )}
          {!!(left && right) && (
            <CoverView
              className={`__delimiter__ ${delimiterCls ?? ""}`}
              style={mergeStyle(delimiterStyle, delimiterSty)}
            />
          )}
          {!!right && (
            <CoverView
              className="__menu__item__wrap__"
              onClick={(eve) =>
                onRightClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
              }
            >
              <Icon {...right} />
            </CoverView>
          )}
        </CoverView>
        {typeof title === "string" ? (
          <CoverView
            className={`__appbar__title__ __appbar__title__${type}`}
            onClick={(eve) => onTitleClick?.(eve)}
          >
            {title}
          </CoverView>
        ) : (
          { title }
        )}
        <CoverView style={{ width, height }} className="__right__menu__" />
      </CoverView>
      <CoverView style={restProps} />
    </React.Fragment>
  );
};

AppBar.options = {
  addGlobalClass: true,
};

export default AppBar;
