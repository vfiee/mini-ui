export declare interface OverlayProps {
  show: boolean;
  className?: string;
  customAppbar?: boolean;
  preventScroll?: boolean;
  opacity?: number | string;
  zIndex?: number | string;
  duration?: number | string;
  onClick?: (eve: any) => void;
  style?: React.CSSProperties | string;
  children?: React.ReactElement | string;
}
