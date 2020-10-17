import React from "react";
import { View } from "@tarojs/components";
import { mergeStyle } from "utils";
import { LoadingProps } from "types";

const defaultLoadingPorps: LoadingProps = {
  color: "#999",
  type: "circular",
  size: "40rpx",
  vertical: false,
  textSize: "28rpx",
  block: false,
};
const dots = Array.from({ length: 12 });
const Loading = (props: LoadingProps) => {
  const { className, color, type, size, textSize, vertical, block, style } = {
    ...defaultLoadingPorps,
    ...props,
  };
  return (
    <View
      className={`__loading__ ${className || ""} ${
        vertical ? `__loading__vertical__` : ""
      } ${block ? `__loading__block__` : ""}`}
    >
      <View
        className={`__loading__${type}__`}
        style={mergeStyle(style, {
          color,
          width: size,
          height: size,
        })}
      >
        {type === "spinner" &&
          dots.map((_, index) => (
            <View className="__loading__spinner__dot__" key={index}></View>
          ))}
      </View>
      <View className="__loading__text__" style={{ fontSize: textSize }}>
        {props.children}
      </View>
    </View>
  );
};
Loading.options = {
  addGlobalClass: true,
};

export default Loading;
