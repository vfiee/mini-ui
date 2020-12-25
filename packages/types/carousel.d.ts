/// <reference types="react" />
import { StandardProps } from "@tarojs/components";
import { SwiperProps as _SwiperProps } from "@tarojs/components/types/Swiper";
import { SwiperItemProps as _SwiperItemProps } from "@tarojs/components/types/SwiperItem";
import {
  CustomElement,
  CustomStyle,
  ImageProps,
  FunctionComponent
} from "./index";

declare type IndicatorType = "dots" | "numbers";

declare type IndicatorPosition =
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

declare interface IndicatorProps extends StandardProps {
  current: number;
  data: Record<string, any>[];
  dotActiveLine?: boolean;
  wrapperClassName?: string;
  indicatorType?: IndicatorType;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  indicatorPosition?: IndicatorPosition;
}

type SwiperItemExtraData = {
  data: Record<string, any>;
  current: number;
};

declare interface SwiperItemProps extends _SwiperItemProps {
  extra?: React.FunctionComponent<SwiperItemExtraData>;
}
declare interface SwiperItemPropsWithData extends SwiperItemProps {
  data: Record<string, any>;
  current: number;
  srcKey?: string;
  image?: Omit<ImageProps, "src" | "round">;
}

declare interface CustomIndicatorProps {
  customIndicator?: boolean;
  dotActiveLine?: boolean;
  indicatorType?: IndicatorType;
  indicatorPosition?: IndicatorPosition;
  wrapperClassName?: string;
}

declare interface SwiperProps extends CustomIndicatorProps, _SwiperProps {}

declare interface CarouselProps {
  data: Record<string, any>[];
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

declare const Carousel: FunctionComponent<CarouselProps>;

export {
  Carousel,
  CarouselProps,
  CarouselData,
  SwiperItemPropsWithData,
  IndicatorProps,
  IndicatorPosition,
  IndicatorType,
  CustomIndicatorProps,
  SwiperProps
};
