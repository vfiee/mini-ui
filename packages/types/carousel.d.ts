/// <reference types="react" />
import { StandardProps } from "@tarojs/components";
import { SwiperProps as _SwiperProps } from "@tarojs/components/types/Swiper";
import { SwiperItemProps as _SwiperItemProps } from "@tarojs/components/types/SwiperItem";
import { BaseObject, CustomElement, CustomStyle, ImageProps } from "./index";

export declare interface CustomIndicatorProps {
  customIndicator?: boolean;
  dotActiveLine?: boolean;
  indicatorType?: IndicatorType;
  indicatorPosition?: IndicatorPosition;
  wrapperClassName?: string;
}

export declare interface SwiperProps
  extends CustomIndicatorProps,
    _SwiperProps {}

export declare interface SwiperItemProps extends _SwiperItemProps {
  extra?: ({ data: BaseObject, current: number }) => CustomElement;
}
export declare type CarouselData = BaseObject[];

export declare interface CarouselProps {
  data: CarouselData;
  srcKey?: string;
  style?: CustomStyle;
  className?: string;
  children?: CustomElement;
  swiper?: SwiperProps;
  swiperItem?: SwiperItemProps;
  image?: Omit<ImageProps, "src" | "round">;
  extra?: CustomElement;
  preview?: boolean;
  showMenu?: boolean;
}

export declare type IndicatorType = "dots" | "numbers";

export declare type IndicatorPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "leftTop"
  | "leftCenter"
  | "leftBottom"
  | "rightTop"
  | "rightCenter"
  | "rightBottom"
  | "bottomLeft"
  | "bottomRight"
  | "bottomCenter";

export declare interface IndicatorProps extends StandardProps {
  current: number;
  data: BaseObject[];
  dotActiveLine?: boolean;
  wrapperClassName?: string;
  indicatorType?: IndicatorType;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  indicatorPosition?: IndicatorPosition;
}

export declare interface SwiperItemPropsWithData extends SwiperItemProps {
  data: BaseObject;
  current: number;
  srcKey?: string;
  image?: Omit<ImageProps, "src">;
}

declare const Carousel: React.ComponentType<CarouselProps>;

export default Carousel;
