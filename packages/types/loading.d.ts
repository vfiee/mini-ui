/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { CustomStyle, CustomElement } from "./index";

export declare type LoadingType = "circular" | "spinner";

export declare interface LoadingProps extends ViewProps {
  color?: string;
  size?: string;
  type?: LoadingType;
  vertical?: boolean;
  block?: boolean;
  children?: CustomElement;
  textProps?: ViewProps;
}

declare const Loading: {
  (props: LoadingProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};
export default Loading;
