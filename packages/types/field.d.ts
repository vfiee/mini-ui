/// <reference types="react" />
import {
  CustomStyle,
  CustomTextAlign,
  CustomElement,
  IconProps,
} from "./index";
import { InputProps } from "./baseInput";

declare type FieldType =
  | "text"
  | "number"
  | "idcard"
  | "digit"
  | "tel"
  | "password"
  | "textarea";

declare type ClearTriggerType = "focus" | "always";

declare type TriggleType = "onChange" | "onBlur";

declare type Formatter = (value: any) => any;

// export declare interface Rule {
//   required?: boolean;
//   message?: string | ((value: any, rule: Rule) => string);
//   validator?: (value: any, rule: Rule) => boolean | Promise<any>;
//   pattern?: RegExp;
//   formatter?: (value: any, rule: Rule) => any;
// }

export declare interface FieldProps
  extends Omit<InputProps, "type" | "placeholderStyle"> {
  // Input
  name?: string;
  key?: string;
  type?: FieldType;
  inputClass?: string;
  inputStyle?: CustomStyle;
  inputAlign?: CustomTextAlign;
  readonly?: boolean;
  // Cell
  colon?: boolean;
  leftIcon?: string | IconProps;
  rightIcon?: string | IconProps;
  label?: CustomElement;
  labelClass?: string;
  labelStyle?: CustomStyle;
  labelAlign?: CustomTextAlign;
  required?: boolean;
  center?: boolean;
  // Others
  showWordLimit?: boolean; // 需要设置 maxlength属性
  limitClass?: string;
  limitStyle?: CustomStyle;
  clear?: boolean | IconProps; // 自定义clear icon 或 默认icon样式
  clearTrigger?: ClearTriggerType; // 当输入框有内容时, 显示清除图标的时机, always一直显示, focus 聚焦显示
  showError?: boolean;
  errorMsg?: string;
  errorClass?: string;
  errorStyle?: CustomStyle;
  errorAlign?: CustomTextAlign;
  // format
  formatter?: Formatter;
  formatTrigger?: TriggleType;
  // Children
  children?: CustomElement;
  // Events
  onClear?: Function;
  onLeftIconClick?: Function;
  onRightIconClick?: Function;
}

declare const Field: React.ComponentType<FieldProps>;

export default Field;
