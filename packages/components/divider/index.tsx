import React, { useMemo } from "react";
import { View } from "@tarojs/components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DividerProps } from "types";

const defaultProps: DividerProps = {
  hairLine: true,
  position: "center",
};

const Divider = (props: DividerProps) => {
  const { hairLine, position, text, className, ...restProps } = {
    ...defaultProps,
    ...props,
  };

  const positionCls = useMemo(() => {
    return !!(text || props.children)
      ? `__divider__position__${position}__`
      : "";
  }, [position, props.children, text]);

  return (
    <View
      {...restProps}
      className={`__divider__ ${
        hairLine ? "__divider__hairline__" : ""
      } ${positionCls} ${className ?? ""}`}
    >
      {text}
      {props?.children}
    </View>
  );
};

Divider.options = {
  addGlobalClass: true,
};

export default Divider;
