/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";

declare type ContentPosition = "left" | "right" | "center";

export declare interface DividerProps extends ViewProps {
  text?: string;
  hairLine?: boolean;
  contentPosition?: ContentPosition;
}

declare const Divider: {
  (props: DividerProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};

export default Divider;
