/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { IconProps, CustomElement } from "./index";

declare type EmptyType = "empty" | "network" | "error";

declare interface EmptyProps extends ViewProps {
  description?: string;
  children?: CustomElement;
  image?: EmptyType | IconProps;
}

declare type DefaultIconProps = {
  [key: string]: IconProps;
};

declare const Empty: React.ComponentType<Empty>;

export { Empty, EmptyType, EmptyProps, DefaultIconProps };
