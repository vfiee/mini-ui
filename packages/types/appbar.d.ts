/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { IconProps, navigationBarTextStyle } from "./index";

export declare interface MenuIcon {
  white?: IconProps;
  black?: IconProps;
}

export declare interface leftIconProps extends ViewProps {
  home?: MenuIcon;
  back?: MenuIcon;
}

export declare interface RightIconProps extends ViewProps {
  menu?: MenuIcon;
}

export declare interface TitleProps extends ViewProps {
  text?: string;
}

export declare interface NavigationBarProps extends ViewProps {
  title?: string | TitleProps;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  type?: navigationBarTextStyle;
  left?: leftIconProps;
  middle?: ViewProps;
  right?: RightIconProps;
  onTitleClick?: Function;
  onLeftClick?: Function;
  onRightClick?: Function;
}

declare const AppBar: {
  (props: NavigationBarProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};

export default AppBar;
