import React, { useState, useMemo, useCallback } from "react";
import { previewImage } from "@tarojs/taro";
import { Swiper, SwiperItem, View, Text } from "@tarojs/components";
import Image from "components/image";
import { mergeStyle, isEmpty, compact, get } from "utils";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IndicatorProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CarouselProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CarouselData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SwiperItemPropsWithData,
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
  const extraText = useMemo(() => get(data, `[${current}]._text`, ""), [
    current,
    data,
  ]);
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

const CarouselItem = (props: SwiperItemPropsWithData) => {
  const {
    data,
    onClick,
    className,
    image,
    current,
    srcKey,
    ...restProps
  } = props;

  const src = useMemo(() => (srcKey ? data[srcKey] : data["src"]), [
    data,
    srcKey,
  ]);
  const { className: imageCls, ...restImageProps } = image ?? {};
  return (
    <SwiperItem
      {...restProps}
      key={data.id}
      onClick={onClick?.bind(null, data)}
      className={`__swiper__item__ ${className ?? ""}`}
    >
      <Image
        {...restImageProps}
        src={src}
        className={`__carousel__img__ ${imageCls ?? ""} `}
      />
      {props?.extra?.({ data, current })}
    </SwiperItem>
  );
};

const Carousel = (props: CarouselProps) => {
  const {
    data,
    style,
    className,
    swiper,
    swiperItem,
    image,
    srcKey,
    preview,
    showMenu,
  } = props;
  const {
    onClick,
    onChange,
    customIndicator,
    dotActiveLine,
    wrapperClassName,
    indicatorType,
    indicatorPosition,
    ...restProps
  } = swiper ?? {};
  const carouselData = useMemo(
    () => (!isEmpty(data) ? data : [{}]) as CarouselData,
    [data]
  );
  const [current, setCurrent] = useState(swiper?.current ?? 0);
  const onSwiperChange = useCallback(
    (eve) => {
      setCurrent(eve.detail.current);
      onChange?.call(null, eve);
    },
    [onChange]
  );
  const showOriginIndicator = useMemo(
    () => !customIndicator && carouselData.length > 1,
    [carouselData, customIndicator]
  );
  const showCustomIndicator = useMemo(
    () => !!(customIndicator && carouselData.length > 1),
    [carouselData, customIndicator]
  );
  const onSwiperClick = useCallback(
    (eve) => {
      onClick?.(eve);
      if (preview && !isEmpty(data)) {
        const urls: string[] = carouselData.map((_data) =>
          get(_data, srcKey || "src", "")
        );
        previewImage(
          {
            urls,
            current: urls[current],
          },
          // @ts-ignore
          showMenu
        );
      }
    },
    [carouselData, current, data, onClick, preview, showMenu, srcKey]
  );
  return (
    <View className={`__carousel__ ${className ?? ""}`} style={style}>
      <Swiper
        {...restProps}
        current={current}
        onClick={onSwiperClick}
        onChange={onSwiperChange}
        indicatorDots={showOriginIndicator}
        className={`__swiper__ ${swiper?.className ?? ""}`}
      >
        {carouselData.map((item, index) => (
          <CarouselItem
            {...swiperItem}
            current={current}
            srcKey={srcKey}
            image={image}
            key={index}
            data={item}
          />
        ))}
      </Swiper>
      {props?.extra}
      {props?.children}
      {showCustomIndicator && (
        <Indicator
          {...{
            current,
            dotActiveLine,
            indicatorType,
            wrapperClassName,
            indicatorPosition,
            data: carouselData,
            indicatorColor: swiper?.indicatorColor,
            indicatorActiveColor: swiper?.indicatorActiveColor,
          }}
        />
      )}
    </View>
  );
};

export default Carousel;
