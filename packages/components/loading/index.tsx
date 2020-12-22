import React, { useRef, isValidElement } from "react";
import { View } from "@tarojs/components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoadingProps } from "types";

const Loading = (props: LoadingProps) => {
  const {
    color,
    type,
    size,
    block,
    style,
    vertical,
    className,
    textProps,
    ...restProps
  } = props;
  const dots = useRef(Array.from({ length: 12 }));

  return (
    <View
      {...restProps}
      className={`__loading__ ${vertical ? `__loading__vertical__` : ""} ${
        block ? `__loading__block__` : ""
      } ${className ?? ""} `}
    >
      <View
        className={`__loading__${type}__`}
        style={{ color, width: size, height: size }}
      >
        {type === "spinner" &&
          dots.current.map((_, index) => (
            <View className="__loading__spinner__dot__" key={index}></View>
          ))}
      </View>
      {isValidElement(props?.children) ? (
        props?.children
      ) : (
        <View
          {...textProps}
          className={`__loading__text__ ${textProps?.className ?? ""}`}
        >
          {props?.children}
        </View>
      )}
    </View>
  );
};

Loading.displayName = "Loading";

Loading.options = {
  addGlobalClass: true
};
Loading.defaultProps = {
  color: "#999",
  type: "circular",
  size: "40rpx",
  vertical: false,
  block: false
};

export default Loading;
