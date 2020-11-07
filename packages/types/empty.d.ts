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

declare const Empty: React.ComponentType<Empty>;

export default Empty;
