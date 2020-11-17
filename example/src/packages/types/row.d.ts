/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import Col from "types/col";
import { CustomElement } from "./index";

declare type Justify =
  | "normal"
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";

declare type Align =
  | "normal"
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center";

declare type Gutter = [number, number];

declare interface RowProps extends ViewProps {
  justify?: Justify;
  align?: Align;
  gutter?: number | Gutter;
  gutterUsePx?: boolean;
  children?: Col | Col[];
}

declare const Row: React.ComponentType<RowProps>;

export { Row, RowProps, Justify, Align, Gutter };
