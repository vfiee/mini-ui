/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { IconProps, navigationBarTextStyle } from "./index";

export declare interface NavigationBarProps extends ViewProps {
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

declare const AppBar: {
  (props: NavigationBarProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};

export default AppBar;
