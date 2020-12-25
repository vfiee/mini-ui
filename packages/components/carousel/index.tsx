import React, { useState, useMemo, useCallback } from "react";
import { previewImage } from "@tarojs/taro";
import { Swiper, SwiperItem, View, Text } from "@tarojs/components";
import Image from "components/image";
import { mergeStyle, isEmpty, compact, get, createBEM } from "utils";
import {
  IndicatorProps,
  CarouselProps,
  CarouselData,
  SwiperItemPropsWithData,
  FunctionComponent
} from "types";

const bem = createBEM("carousel");

const IndicatorDots: FunctionComponent<IndicatorProps> = props => {
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
          backgroundColor: isCurrent ? indicatorActiveColor : indicatorColor
        });
        return (
          <View
            {...restProps}
            key={index}
            style={_style}
            className={`${bem("dot", {
              active: isCurrent,
              line: isCurrent && dotActiveLine
            })} ${className ?? ""}`}
          ></View>
        );
      })}
    </View>
  );
};
const IndicatorNumber: FunctionComponent<IndicatorProps> = (
  props: IndicatorProps
) => {
  const { data, current, className, wrapperClassName, ...restProps } = props;
  const extraText = useMemo(() => get(data, `[${current}]._text`, ""), [
    current,
    data
  ]);
  return (
    <View className={wrapperClassName}>
      <View {...restProps} className={`${bem("numbers")} ${className ?? ""}`}>
        <Text>
          {current + 1}/{data.length}
        </Text>
        {extraText.length > 0 && (
          <Text className={bem("extra")}>{extraText}</Text>
        )}
      </View>
    </View>
  );
};
const Indicator: FunctionComponent<IndicatorProps> = props => {
  const {
    indicatorType,
    indicatorPosition,
    wrapperClassName,
    ...restProps
  } = compact(props, v => typeof v === "undefined");
  const IndicatorComponent: React.FunctionComponent<IndicatorProps> = get(
    {
      dots: IndicatorDots,
      numbers: IndicatorNumber
    },
    indicatorType,
    IndicatorDots
  );
  return (
    <IndicatorComponent
      {...restProps}
      wrapperClassName={`${bem("indicator", indicatorPosition)} ${
        wrapperClassName ?? ""
      }`}
    />
  );
};
Indicator.defaultProps = {
  indicatorType: "dots",
  indicatorPosition: "bottomCenter",
  indicatorColor: "rgba(0, 0, 0, .3)",
  indicatorActiveColor: "#000000"
};

const CarouselItem: FunctionComponent<SwiperItemPropsWithData> = props => {
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
    srcKey
  ]);
  const { className: imageCls, ...restImageProps } = image ?? {};
  return (
    <SwiperItem
      {...restProps}
      onClick={onClick?.bind(null, data)}
      className={`${bem("swiperItem")} ${className ?? ""}`}
    >
      <Image
        {...restImageProps}
        src={src}
        className={`${bem("swiperImg")} ${imageCls ?? ""} `}
      />
      {props.extra?.({ data, current })}
    </SwiperItem>
  );
};

const Carousel: FunctionComponent<CarouselProps> = props => {
  const {
    data,
    style,
    className,
    swiper,
    swiperItem,
    image,
    srcKey,
    preview,
    showMenu
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
    eve => {
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
    eve => {
      onClick?.(eve);
      if (preview && !isEmpty(data)) {
        const urls: string[] = carouselData.map(_data =>
          get(_data, srcKey || "src", "")
        );
        previewImage(
          {
            urls,
            current: urls[current]
          },
          // @ts-ignore
          showMenu
        );
      }
    },
    [carouselData, current, data, onClick, preview, showMenu, srcKey]
  );
  return (
    <View className={`${bem()} ${className ?? ""}`} style={style}>
      <Swiper
        {...restProps}
        current={current}
        onClick={onSwiperClick}
        onChange={onSwiperChange}
        indicatorDots={showOriginIndicator}
        className={`${bem("swiper")} ${swiper?.className ?? ""}`}
      >
        {carouselData.map((item, index) => (
          <CarouselItem
            {...swiperItem}
            key={index}
            data={item}
            image={image}
            srcKey={srcKey}
            current={current}
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
            indicatorActiveColor: swiper?.indicatorActiveColor
          }}
        />
      )}
    </View>
  );
};

Carousel.displayName = "Carousel";

Carousel.options = {
  addGlobalClass: true
};

export default Carousel;
