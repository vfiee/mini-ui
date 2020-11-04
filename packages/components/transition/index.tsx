import React, { useMemo } from "react";
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
    afterLeave,
  });
  // @ts-ignore
  const { type, key, _owner, props: _props, ...restProps } = props.children;
  const mergedStyle = useMemo(
    () =>
      mergeStyle(
        {
          display: display ? "" : "none",
          transitionDuration: duration + "ms",
        },
        _props.style
      ),
    [_props.style, display, duration]
  );
  if (!inited) return null;
  return React.createElement(type, {
    ...restProps,
    ..._props,
    key,
    onTransitionEnd,
    style: mergedStyle,
    className: `__transition__ ${className} ${_props?.className ?? ""}`,
  });
};

export default Transition;
