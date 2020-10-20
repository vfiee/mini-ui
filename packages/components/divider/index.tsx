import React from "react";
import { View } from "@tarojs/components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DividerProps } from "types";

const defaultEmptyProps: DividerProps = {
  text: "",
  hairLine: true,
  contentPosition: "center",
};

const Divider = (props: DividerProps) => {
  const { hairLine, contentPosition, text, className = "", ...dividerProps } = {
    ...defaultEmptyProps,
    ...props,
  };
  return (
    <View
      {...dividerProps}
      className={`__divider__ ${hairLine ? "__divider__hairline" : ""} ${
        !!text ? `__divider__position__${contentPosition}` : ""
      } ${className}`}
    >
      {text}
    </View>
  );
};

Divider.options = {
  addGlobalClass: true,
};

export default Divider;
