/// <reference types="react" />
import { CustomElement } from "./index";

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
  beforeEnter?: Function;
  onEnter?: Function;
  afterEnter?: Function;
  beforeLeave?: Function;
  onLeave?: Function;
  afterLeave?: Function;
}

declare const Transition: (
  props: TransitionProps
) => React.ReactElement<
  any,
  | string
  | ((
      props: any
    ) => React.ReactElement<
      any,
      string | any | (new (props: any) => React.Component<any, any, any>)
    > | null)
  | (new (props: any) => React.Component<any, any, any>)
> | null;

export default Transition;
