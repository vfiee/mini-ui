/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { IconProps, CustomElement } from "./index";

export declare type EmptyType = "empty" | "network" | "error";

export declare interface EmptyProps extends ViewProps {
  description?: string;
  children?: CustomElement;
  image?: EmptyType | IconProps;
}

export declare type DefaultIconProps = {
  [key: string]: IconProps;
};

declare const Empty: {
  (props: EmptyProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};
export default Empty;
