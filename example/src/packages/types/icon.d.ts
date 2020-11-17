/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { CustomElement } from "./index";

declare interface IconProps extends ViewProps {
  isCover?: boolean;
  type: string;
  size?: string;
  color?: string;
  fontFamily?: string;
  localImage?: boolean;
  children?: CustomElement;
}

declare const Icon: React.ComponentType<IconProps>;

export { Icon, IconProps };
