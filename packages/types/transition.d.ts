/// <reference types="react" />

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
  show?: boolean;
  duration?: number; //ms
  name: TransitionType;
  children: React.ReactElement;
  beforeEnter?: Function;
  onEnter?: Function;
  afterEnter?: Function;
  beforeLeave?: Function;
  onLeave?: Function;
  afterLeave?: Function;
}

declare const Transition: React.ComponentType<TransitionProps>;

export default Transition;
