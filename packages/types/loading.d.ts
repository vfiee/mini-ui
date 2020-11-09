/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { CustomStyle, CustomElement } from "./index";

declare type LoadingType = "circular" | "spinner";

declare interface LoadingProps extends ViewProps {
  color?: string;
  size?: string;
  type?: LoadingType;
  vertical?: boolean;
  block?: boolean;
  children?: CustomElement;
  textProps?: ViewProps;
}

declare const Loading: React.ComponentType<LoadingProps>;

export { Loading, LoadingType, LoadingProps };
