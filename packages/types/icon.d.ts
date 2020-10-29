/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { CustomElement } from "./index";

export declare interface IconProps extends ViewProps {
  isCover?: boolean;
  type: string;
  size?: string;
  color?: string;
  fontFamily?: string;
  localImage?: boolean;
  children?: CustomElement;
}

declare const Icon: {
  (props: IconProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};

export default Icon;
