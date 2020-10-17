import { CustomStyle } from "./index";

export declare type LoadingType = "circular" | "spinner";

export declare interface LoadingProps {
  color?: string;
  type?: LoadingType;
  size?: string;
  textSize?: string;
  vertical?: boolean;
  block?: boolean;
  className?: string;
  style?: CustomStyle;
  children?: string | React.ReactElement;
}
