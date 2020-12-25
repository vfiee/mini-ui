import React, { isValidElement, useRef } from "react";
import { CoverView, View } from "@tarojs/components";
import Icon from "components/icon";
import { useMenuButton } from "hooks";
import { mergeStyle, createBEM } from "utils";
import type { AppBarProps, FunctionComponent } from "types";

const AppBar: FunctionComponent<AppBarProps> = props => {
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
  const { current: bem } = useRef(createBEM("appbar"));
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
        className={`${bem()} ${className ?? ""}`}
      >
        {!!left &&
          (isValidElement(left) ? (
            left
          ) : (
            <AppBarView
              style={mergeMenuStyle}
              className={`${bem("left", { full: left && right })}`}
            >
              <AppBarView
                className={bem("icon")}
                onClick={eve =>
                  onLeftClick?.({ menuStyle: mergeMenuStyle, rect }, eve)
                }
              >
                <Icon {...left} />
              </AppBarView>
              {!!right && (
                <AppBarView
                  className={`${bem("delimiter")} ${delimiterCls ?? ""}`}
                  style={mergeStyle(delimiterStyle, delimiterSty)}
                />
              )}
              {!!right &&
                (isValidElement(right) ? (
                  right
                ) : (
                  <AppBarView
                    className={bem("icon")}
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
              onClick={onTitleClick}
              className={bem("title", { [type as string]: !!type })}
            >
              {title}
            </AppBarView>
          ))}
        {!!left && (
          <AppBarView
            className={bem("right")}
            style={{ width: menuStyle.width, height: menuStyle.height }}
          />
        )}
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
