/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { IconProps, navigationBarTextStyle, FunctionComponent } from "./index";
import { ITouchEvent } from "@tarojs/components/types/common";

declare interface AppBarProps extends ViewProps {
  isCoverView?: boolean;
  title?: string | React.ReactElement;
  backgroundColor?: string;
  type?: navigationBarTextStyle;
  left?: IconProps;
  middle?: ViewProps;
  right?: IconProps;
  onTitleClick?: (event: ITouchEvent<any>) => void;
  onLeftClick?: Function;
  onRightClick?: Function;
}

declare const AppBar: FunctionComponent<AppBarProps>;

export { AppBar, AppBarProps };
