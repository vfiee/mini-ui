import { ViewProps } from "@tarojs/components/types/View";

export declare interface IconProps extends ViewProps {
  isCover?: boolean;
  type: string;
  size?: string;
  color?: string;
  className?: string;
  fontFamily?: string;
  localImage?: boolean;
  style?: React.CSSProperties | string;
  children?: string | React.ReactElement;
}
