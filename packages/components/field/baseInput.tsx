import React from "react";
import { Input, Textarea } from "@tarojs/components";
import { InputProps } from "types";

const BaseInput = (props: InputProps) => {
  const { isTextarea, ...rest } = props;
  const Component = isTextarea ? Textarea : Input;
  return <Component {...rest} />;
};

export default BaseInput;
