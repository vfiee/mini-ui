import React from "react";
import { useTransition } from "hooks";
import { mergeStyle } from "utils";
import { TransitionProps } from "types";

const Transition = (props: TransitionProps) => {
  const { name, show, duration = 300 } = props;
  const {
    inited,
    display,
    className,
    onTransitionEnd,
    transitionDuration,
  } = useTransition({
    show,
    name,
    transitionDuration: duration,
  });
  if (!inited) return null;
  const { type, props: _props, ...otherProps } = props.children;
  return React.createElement(type, {
    ...otherProps,
    ..._props,
    onTransitionEnd,
    className: `__transition__ ${className} ${_props?.className ?? ""}`,
    style: `transition-duration:${transitionDuration}ms;${
      display ? "" : "display:none;"
    }${_props.style ? mergeStyle(_props.style) : ""}`,
  });
};

export default Transition;
