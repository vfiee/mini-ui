import { useRef } from "react";
import { getMenuButtonBoundingClientRect, get } from "utils";
import { useSystemInfo } from "hooks";
import { BaseObject, navigationBarTextStyle } from "types";

export declare type menuProps = {
  type?: navigationBarTextStyle;
};

export declare type menuData = {
  rect: BaseObject;
  wrapStyle: BaseObject;
  menuStyle: BaseObject;
  delimiterStyle: BaseObject;
  system: Taro.getSystemInfoSync.Result;
};

const defaultMenuProps = {
  type: "white",
};

const defaultColors = {
  border: {
    black: `rgba(0,0,0,0.1)`,
    white: `rgba(255,255,255,0.25)`,
  },
  background: {
    black: "rgba(252,252,252,0.6)",
    white: "rgba(0,0,0,0.15)",
  },
  delimiter: {
    black: "rgba(0,0,0,0.1)",
    white: "rgba(255,255,255,0.3)",
  },
};

const useMenuButton = (props: menuProps = {}): menuData => {
  const { type: typeStyle } = {
    ...defaultMenuProps,
    ...props,
  };
  const rectRef = useRef(getMenuButtonBoundingClientRect());
  const systemInfo = useSystemInfo();
  const { width, height, top, right } = rectRef.current;
  const { screenWidth, statusBarHeight } = systemInfo;
  const menuRef = useRef({
    wrapStyle: {
      position: "relative",
      zIndex: 1000,
      boxSizing: "border-box",
      width: screenWidth + "px",
      paddingTop: statusBarHeight + "px",
      paddingLeft: screenWidth - right + "px",
      paddingRight: screenWidth - right + "px",
      height: `${height + statusBarHeight + (top - statusBarHeight + 2) * 2}px`,
    },
    menuStyle: {
      boxSizing: "border-box",
      width: width + `px`,
      height: height + `px`,
      borderRadius: height / 2 + `px`,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: get(defaultColors, `border.${typeStyle}`),
      backgroundColor: get(defaultColors, `background.${typeStyle}`),
    },
    delimiterStyle: {
      width: `1px`,
      height: "18px",
      backgroundColor: get(defaultColors, `delimiter.${typeStyle}`),
    },
  });
  return {
    ...menuRef.current,
    system: systemInfo,
    rect: rectRef.current,
  };
};

export default useMenuButton;
