import { StandardProps } from "@tarojs/components";
import { SwiperProps } from "@tarojs/components/types/Swiper";
import { SwiperItemProps } from "@tarojs/components/types/SwiperItem";

export declare interface ExtendSwiperProps
  extends CustomIndicatorProps,
    SwiperProps {}

export declare interface ExtendSwiperItemProps extends SwiperItemProps {
  extra?: (data?: BaseObject) => React.ReactElement;
}
export declare type CarouselData = BaseObject[];
export declare interface CarouselProps {
  data: CarouselData;
  style?: React.CSSProperties | string;
  className?: string;
  children?: React.ReactElement;
  swiperProps?: ExtendSwiperProps;
  swiperItemProps?: ExtendSwiperItemProps;
  extra?: React.ReactElement;
}

export declare type IndicatorType = "dots" | "numbers";

export declare type IndicatorPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "leftTop"
  | "leftCenter"
  | "leftRight"
  | "rightTop"
  | "rightCenter"
  | "rightBottom"
  | "bottomLeft"
  | "bottomRight"
  | "bottomCenter";

export declare interface CustomIndicatorProps {
  customIndicator?: boolean;
  dotActiveLine?: boolean;
  indicatorType?: IndicatorType;
  indicatorPosition?: IndicatorPosition;
  wrapperClassName?: string;
}

declare interface IndicatorProps extends StandardProps {
  current: number;
  data: BaseObject[];
  dotActiveLine?: boolean;
  wrapperClassName?: string;
  indicatorType?: IndicatorType;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  indicatorPosition?: IndicatorPosition;
}

declare interface ExtendSwiperItemPropsWithData extends ExtendSwiperItemProps {
  data: BaseObject;
}
