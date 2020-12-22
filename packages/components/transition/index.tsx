import React from "react";
import { useTransition } from "hooks";
import { mergeStyle } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionProps } from "types";

const Transition = (props: TransitionProps) => {
  const {
    name,
    show = false,
    duration = 300,
    beforeEnter,
    onEnter,
    afterEnter,
    beforeLeave,
    onLeave,
    afterLeave,
    children
  } = props;
  const { inited, display, onTransitionEnd, className } = useTransition({
    show,
    name,
    duration,
    beforeEnter,
    onEnter,
    afterEnter,
    beforeLeave,
    onLeave,
    afterLeave
  });
  // @ts-ignore
  if (!inited) return null;
  return React.cloneElement(children, {
    onTransitionEnd,
    className: `__transition__ ${className} ${
      children?.props?.className ?? ""
    }`,
    style: mergeStyle(
      {
        display: display ? "" : "none",
        transitionDuration: duration + "ms"
      },
      children.props.style
    )
  });
};

Transition.displayName = "Transition";

export default Transition;
