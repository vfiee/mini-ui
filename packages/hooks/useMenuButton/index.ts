import { getMenuButtonBoundingClientRect, get, getSystemInfoSync } from "utils";
import type { navigationBarTextStyle } from "types";

export declare type menuProps = {
  type?: navigationBarTextStyle;
};

export declare type menuData = {
  rect: Taro.getMenuButtonBoundingClientRect.Rect;
  wrapStyle: React.CSSProperties;
  menuStyle: React.CSSProperties;
  delimiterStyle: React.CSSProperties;
  system: Taro.getSystemInfoSync.Result;
};

const defaultMenuProps: menuProps = { type: "white" };

const defaultColors = {
  border: {
    black: `rgba(0,0,0,0.1)`,
    white: `rgba(255,255,255,0.25)`
  },
  background: {
    black: "rgba(252,252,252,0.6)",
    white: "rgba(0,0,0,0.15)"
  },
  delimiter: {
    black: "rgba(0,0,0,0.1)",
    white: "rgba(255,255,255,0.3)"
  }
};

const useMenuButton = (props: menuProps = {}): menuData => {
  const { type: typeStyle } = {
    ...defaultMenuProps,
    ...props
  };
  const rect = getMenuButtonBoundingClientRect();
  const system = getSystemInfoSync();
  const { width, height, top, right } = rect;
  const { screenWidth, statusBarHeight } = system;
  return {
    wrapStyle: {
      boxSizing: "border-box",
      width: screenWidth + "px",
      paddingTop: statusBarHeight + "px",
      paddingLeft: screenWidth - right + "px",
      paddingRight: screenWidth - right + "px",
      height: `${height + statusBarHeight + (top - statusBarHeight + 2) * 2}px`
    },
    menuStyle: {
      boxSizing: "border-box",
      width: width + `px`,
      height: height + `px`,
      borderRadius: height / 2 + `px`,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: get(defaultColors, `border.${typeStyle}`),
      backgroundColor: get(defaultColors, `background.${typeStyle}`)
    },
    delimiterStyle: {
      width: `1px`,
      height: "18px",
      backgroundColor: get(defaultColors, `delimiter.${typeStyle}`)
    },
    system,
    rect
  };
};

export default useMenuButton;
