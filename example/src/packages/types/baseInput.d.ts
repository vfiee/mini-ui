/// <reference types="react" />
import { InputProps as _InputProps } from "@tarojs/components/types/input";
import { CommonEventFunction } from "@tarojs/components/types";
import { TextareaProps } from "@tarojs/components/types/Textarea";

declare interface InputProps extends _InputProps {
  isTextarea?: boolean;
  // Textarea
  fixed?: boolean;
  autoHeight?: boolean;
  showConfirmBar?: boolean;
  disableDefaultPadding?: boolean;
  onLineChange?: CommonEventFunction<TextareaProps.onLineChangeEventDetail>;
}

declare const BaseInput: React.ComponentType<InputProps>;

export { BaseInput, InputProps };
