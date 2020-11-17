/// <reference types="react" />
import { ViewProps } from "@tarojs/components/types/View";
import { ITouchEvent } from "@tarojs/components/types/common";
import { CustomElement } from "./index";

declare interface OverlayProps extends ViewProps {
  show?: boolean;
  withoutTransition?: boolean;
  customAppbar?: boolean;
  preventScroll?: boolean;
  opacity?: number | string;
  zIndex?: number | string;
  duration?: number | string;
  children?: CustomElement;
  onClick?: (event: ITouchEvent) => void;
}

declare const Overlay: React.ComponentType<OverlayProps>;

export { Overlay, OverlayProps };
