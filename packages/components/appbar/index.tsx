import React from "react";
import { CoverView, View } from "@tarojs/components";
import Icon from "components/icon";
import { useMenuButton } from "hooks";
import { mergeStyle } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavigationBarProps } from "types";

const defaultNavigationBarProps: NavigationBarProps = {
  title: "",
  type: "white",
  isCoverView: false,
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
    isCoverView,
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

  const AppBarView = isCoverView ? CoverView : View;
  return (
    <React.Fragment>
      <AppBarView
        style={mergeStyle(
          {
            ...wrapStyle,
            backgroundColor,
          },
          style
        )}
        className={`__appbar__ ${className ?? ""}`}
      >
        <AppBarView
          style={mergeMenuStyle}
          className={`__left__menu__ ${
            !!(left && right) ? "__left__menu__full__" : ""
          }`}
        >
          {!!left && (
            <AppBarView
              className="__menu__item__wrap__"
              onClick={(eve) =>
                onLeftClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
              }
            >
              <Icon {...left} />
            </AppBarView>
          )}
          {!!(left && right) && (
            <AppBarView
              className={`__delimiter__ ${delimiterCls ?? ""}`}
              style={mergeStyle(delimiterStyle, delimiterSty)}
            />
          )}
          {!!right && (
            <AppBarView
              className="__menu__item__wrap__"
              onClick={(eve) =>
                onRightClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
              }
            >
              <Icon {...right} />
            </AppBarView>
          )}
        </AppBarView>
        {typeof title === "string" ? (
          <AppBarView
            className={`__appbar__title__ __appbar__title__${type}`}
            onClick={(eve) => onTitleClick?.(eve)}
          >
            {title}
          </AppBarView>
        ) : (
          { title }
        )}
        <AppBarView style={{ width, height }} className="__right__menu__" />
      </AppBarView>
      <AppBarView style={restProps} />
    </React.Fragment>
  );
};

AppBar.options = {
  addGlobalClass: true,
};

export default AppBar;
