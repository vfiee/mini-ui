/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { CustomElement } from "./index";

export declare type GridRange =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

export declare interface ColProps extends ViewProps {
  span?: GridRange;
  offset?: GridRange;
  pull?: GridRange;
  push?: GridRange;
  order?: number;
  children?: CustomElement;
}

declare const Col: React.ComponentType<ColProps>;

export { Col, ColProps, GridRange };
