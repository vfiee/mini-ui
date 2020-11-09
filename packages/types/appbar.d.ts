/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { IconProps, navigationBarTextStyle } from "./index";

declare interface AppBarProps extends ViewProps {
  isCoverView?: boolean;
  title?: string | React.ReactElement;
  backgroundColor?: string;
  type?: navigationBarTextStyle;
  left?: IconProps;
  middle?: ViewProps;
  right?: IconProps;
  onTitleClick?: Function;
  onLeftClick?: Function;
  onRightClick?: Function;
}

declare const AppBar: React.ComponentType<AppBarProps>;

export { AppBar, AppBarProps };
