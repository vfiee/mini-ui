import { ViewProps } from "@tarojs/components/types/View";
import { CustomElement, CustomStyle, IconProps } from "./index";

export declare interface CellGroupProps extends ViewProps {
  title?: CustomElement;
  titleClass?: string;
  titleStyle?: CustomStyle;
  border?: boolean;
  children?: CustomElement;
}

export declare type ArrowDirection = "left" | "right" | "up" | "down";

export declare interface CellProps extends ViewProps {
  title?: CustomElement;
  colon?: boolean;
  titleClass?: string;
  titleStyle?: CustomStyle;
  value: CustomElement;
  valueClass?: string;
  valueStyle?: CustomStyle;
  label?: CustomElement;
  labelClass?: string;
  labelStyle?: CustomStyle;
  icon?: CustomElement | IconProps;
  rightIcon?: CustomElement | IconProps;
  url?: string;
  replace?: boolean;
  required?: boolean;
  center?: boolean;
  arrow?: boolean;
  border?: boolean;
  arrowDirection?: ArrowDirection;
  children?: CustomElement;
}
