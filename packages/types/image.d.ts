/// <reference types="react" />
import { ImageProps as _ImageProps } from "@tarojs/components/types/Image";
import { CustomElement } from "types";

export declare interface ImageProps extends _ImageProps {
  showLoading?: boolean;
  loading?: string | React.ReactElement;
  showError?: boolean;
  error?: string | React.ReactElement;
  round?: boolean;
  radius?: string;
  width?: string;
  height?: string;
  delay?: number;
  children?: CustomElement;
}

declare const Image: React.ComponentType<ImageProps>;

export default Image;
