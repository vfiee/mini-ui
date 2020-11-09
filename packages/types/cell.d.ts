/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { CustomElement, CustomStyle, IconProps } from "./index";

declare interface CellGroupProps extends ViewProps {
  title?: CustomElement;
  titleClass?: string;
  titleStyle?: CustomStyle;
  border?: boolean;
  children?: CustomElement;
}

declare type ArrowDirection = "left" | "right" | "up" | "down";

declare interface CellProps extends ViewProps {
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

declare const Cell: React.ComponentType<CellProps>;

declare const CellGroup: React.ComponentType<CellGroupProps>;

export { Cell, CellProps, CellGroup, CellGroupProps };
