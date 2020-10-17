import { ImageProps as _ImageProps } from "@tarojs/components/types/Image";

export declare interface ImageProps extends _ImageProps {
  src: string;
  showLoading?: boolean;
  loadingIcon?: string;
  loading?: React.ReactElement;
  showError?: boolean;
  errorIcon?: string;
  error?: React.ReactElement;
  round?: boolean;
  radius?: string;
  width?: string;
  height?: string;
}
