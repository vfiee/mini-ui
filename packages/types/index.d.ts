export * from "./appbar";

export * from "./authorize";

export * from "./carousel";

export * from "./cell";

export * from "./divider";

export * from "./empty";

export * from "./field";

export * from "./baseInput";

export * from "./icon";

export * from "./image";

export * from "./list";

export * from "./loading";

export * from "./overlay";

export * from "./transition";

export type BaseObject = {
  [key: string]: any;
};

export declare type BaseMap = Map<string, any>;

export declare type ExtractAllType<T> = T extends { [key: string]: infer U }
  ? U
  : T;

export declare type ExtractArrayType<T> = T extends (infer U)[] ? U : T;

export declare type CustomElement = React.ReactNode;

export declare type CustomStyle = React.CSSProperties | string;

export declare type CustomTextAlign = "left" | "center" | "right";

export declare type navigationBarTextStyle = "black" | "white";

export declare type TransitionType =
  | "fade"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight";

export declare type TransitionStatus =
  | "enter"
  | "enterTo"
  | "leave"
  | "leaveTo";

export * from "./mini-ui";
