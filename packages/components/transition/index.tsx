import React, { useMemo } from "react";
import { useTransition } from "hooks";
import { mergeStyle } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionProps } from "types";

const Transition = (props: TransitionProps) => {
  const { name, show = false, duration = 300 } = props;
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
  const { type, key, props: _props, ...otherProps } = props.children;
  const mergedStyle = useMemo(
    () =>
      mergeStyle(
        {
          transitionDuration: transitionDuration + "ms",
          display: display ? "" : "none",
        },
        _props.style
      ),
    [_props.style, display, transitionDuration]
  );
  if (!inited) return null;
  return React.createElement(type, {
    ...otherProps,
    ..._props,
    key,
    onTransitionEnd,
    style: mergedStyle,
    className: `__transition__ ${className} ${_props?.className ?? ""}`,
  });
};

export default Transition;
