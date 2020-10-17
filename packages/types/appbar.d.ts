import { ViewProps } from "@tarojs/components/types/View";

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
