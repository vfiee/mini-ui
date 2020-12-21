import React, { isValidElement } from "react";
import { CoverView, View } from "@tarojs/components";
import Icon from "components/icon";
import { useMenuButton } from "hooks";
import { mergeStyle } from "utils";
import type { AppBarProps } from "types";

const AppBar = (props: AppBarProps) => {
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
    style,
    className
  } = props;
  const { rect, wrapStyle, menuStyle, delimiterStyle } = useMenuButton({
    type
  });
  const { className: delimiterCls, style: delimiterSty } = middle ?? {};
  const mergeMenuStyle =
    left && right
      ? menuStyle
      : { ...menuStyle, backgroundColor: "transparent", borderWidth: 0 };

  const AppBarView = isCoverView ? CoverView : View;
  return (
    <React.Fragment>
      <AppBarView
        style={mergeStyle(
          {
            ...wrapStyle,
            backgroundColor
          },
          style
        )}
        className={`__appbar__ ${className ?? ""}`}
      >
        {!!left &&
          (isValidElement(left) ? (
            left
          ) : (
            <AppBarView
              style={mergeMenuStyle}
              className={`__left__menu__ ${
                left && right ? "__left__menu__full__" : ""
              }`}
            >
              {!!left && (
                <AppBarView
                  className="__menu__item__wrap__"
                  onClick={eve =>
                    onLeftClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
                  }
                >
                  <Icon {...left} />
                </AppBarView>
              )}
              {left && right && (
                <AppBarView
                  className={`__delimiter__ ${delimiterCls ?? ""}`}
                  style={mergeStyle(delimiterStyle, delimiterSty)}
                />
              )}
              {!!right &&
                (isValidElement(right) ? (
                  right
                ) : (
                  <AppBarView
                    className="__menu__item__wrap__"
                    onClick={eve =>
                      onRightClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
                    }
                  >
                    <Icon {...right} />
                  </AppBarView>
                ))}
            </AppBarView>
          ))}
        {!!title &&
          (isValidElement(title) ? (
            title
          ) : (
            <AppBarView
              onClick={eve => onTitleClick?.(eve)}
              className={`__appbar__title__ __appbar__title__${type}`}
            >
              {title}
            </AppBarView>
          ))}
        <AppBarView
          className="__right__menu__"
          style={{ width: menuStyle.width, height: menuStyle.height }}
        />
      </AppBarView>
      <AppBarView style={wrapStyle} />
    </React.Fragment>
  );
};

AppBar.displayName = "AppBar";

AppBar.options = {
  addGlobalClass: true
};

AppBar.defaultProps = {
  title: "",
  type: "white",
  isCoverView: false,
  backgroundColor: "#fff"
};

export default AppBar;
