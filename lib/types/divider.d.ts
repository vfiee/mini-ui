import { ViewProps } from "@tarojs/components/types/View";

declare type ContentPosition = "left" | "right" | "center";

export declare interface DividerProps extends ViewProps {
  text?: string;
  hairLine?: boolean;
  contentPosition?: ContentPosition;
}
