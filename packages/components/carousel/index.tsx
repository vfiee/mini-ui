import React, { useState } from "react";
import { Swiper, SwiperItem, View, Text } from "@tarojs/components";
import Image from "components/image";
import { mergeStyle, isEmpty, compact, get } from "utils";
import {
  IndicatorProps,
  CarouselProps,
  CarouselData,
  ExtendSwiperItemPropsWithData,
} from "types";

const IndicatorDots = (props: IndicatorProps) => {
  const {
    data,
    style,
    current,
    className,
    dotActiveLine,
    indicatorColor,
    wrapperClassName,
    indicatorActiveColor,
    ...restProps
  } = props;
  return (
    <View className={wrapperClassName}>
      {data.map((__, index) => {
        const isCurrent: boolean = index === current;
        const _style = mergeStyle(style, {
          backgroundColor: isCurrent ? indicatorActiveColor : indicatorColor,
        });
        return (
          <View
            {...restProps}
            key={index}
            style={_style}
            className={`__dot__ ${
              isCurrent
                ? `__dot__active__ ${
                    dotActiveLine ? "__dot__active__line__" : ""
                  }`
                : ""
            } ${className ?? ""}`}
          ></View>
        );
      })}
    </View>
  );
};
const IndicatorNumber = (props: IndicatorProps) => {
  const { data, current, className, wrapperClassName, ...restProps } = props;
  const extraText = get(data, `[${current}]._text`, "");
  return (
    <View className={wrapperClassName}>
      <View {...restProps} className={`__numbers__ ${className ?? ""}`}>
        <Text>
          {current + 1}/{data.length}
        </Text>
        {extraText.length > 0 && (
          <Text className="__extra__text__">{extraText}</Text>
        )}
      </View>
    </View>
  );
};
const defaultIndicator = {
  indicatorType: "dots",
  indicatorPosition: "bottomCenter",
  indicatorColor: "rgba(0, 0, 0, .3)",
  indicatorActiveColor: "#000000",
};
const Indicator = (props: IndicatorProps) => {
  const {
    indicatorType,
    indicatorPosition,
    wrapperClassName = "",
    ...restProps
  } = {
    ...defaultIndicator,
    ...compact(props, (v) => typeof v === "undefined"),
  };
  const IndicatorComponent = get(
    {
      dots: IndicatorDots,
      numbers: IndicatorNumber,
    },
    indicatorType,
    IndicatorDots
  );
  return (
    <IndicatorComponent
      {...restProps}
      wrapperClassName={`__indicator__ __indicator__${indicatorPosition} ${wrapperClassName}`}
    />
  );
};

const CarouselItem = (props: ExtendSwiperItemPropsWithData) => {
  const { data, onClick, extra, className = "", style, ...restProps } = props;
  const { src } = data || {};
  return (
    <SwiperItem
      {...restProps}
      key={data.id}
      className={`__swiper__item__ ${className}`}
      onClick={onClick?.bind(null, data)}
    >
      <View className="__content__">
        <Image
          src={src}
          mode="aspectFit"
          errorIcon="icon-error_img"
          className="__carousel__img__"
        />
      </View>
      {extra?.(data)}
    </SwiperItem>
  );
};

const Carousel = (props: CarouselProps) => {
  const {
    data,
    style = "",
    className = "",
    swiperProps = {},
    swiperItemProps,
  } = props;
  const {
    onChange,
    customIndicator,
    onClick,
    dotActiveLine,
    wrapperClassName,
    indicatorType,
    indicatorPosition,
    ...restProps
  } = swiperProps;
  const carouselData = (!isEmpty(data) ? data : [{}]) as CarouselData;
  const [current, setCurrent] = useState(swiperProps?.current ?? 0);
  const onSwiperChange = (eve) => {
    setCurrent(eve.detail.current);
    onChange?.call(null, eve);
  };
  return (
    <View className={`__carousel__ ${className}`} style={style}>
      <Swiper
        {...restProps}
        current={current}
        onChange={onSwiperChange}
        indicatorDots={!customIndicator && carouselData.length > 1}
        className={`__swiper__ ${swiperProps?.className ?? ""}`}
      >
        {carouselData.map((item, index) => (
          <CarouselItem
            {...swiperItemProps}
            key={index}
            data={item}
            onClick={onClick}
          />
        ))}
      </Swiper>
      {props?.extra}
      {props?.children}
      {!!(customIndicator && carouselData.length > 1) && (
        <Indicator
          {...{
            current,
            dotActiveLine,
            indicatorType,
            wrapperClassName,
            indicatorPosition,
            data: carouselData,
            indicatorColor: swiperProps?.indicatorColor,
            indicatorActiveColor: swiperProps?.indicatorActiveColor,
          }}
        />
      )}
    </View>
  );
};

export default Carousel;
