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

export declare interface TransitionProps {
  show: boolean;
  duration?: number; //ms
  name: TransitionType;
  children: React.ReactElement;
}
