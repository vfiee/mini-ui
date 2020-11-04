import React, { useMemo } from "react";
import { View } from "@tarojs/components";
import { useMenuButton } from "hooks";
import { mergeStyle } from "utils";
import Transition from "components/transition";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OverlayProps } from "types";

const defaultOverlayProps: OverlayProps = {
  show: false,
  zIndex: 1,
  opacity: 0.6,
  duration: 0.3,
  preventScroll: true,
  customAppbar: false,
};

const Overlay = (props: OverlayProps) => {
  const {
    show,
    style,
    zIndex,
    opacity,
    duration,
    className,
    preventScroll,
    customAppbar,
    withoutTransition,
    ...restProps
  } = {
    ...defaultOverlayProps,
    ...props,
  };
  const { wrapStyle } = useMenuButton();
  const mergedStyle = useMemo(() => {
    let _style = mergeStyle(
      {
        zIndex: zIndex as number,
        transitionDuration: duration + "s",
        backgroundColor: `rgba(0,0,0,${opacity})`,
      },
      style
    );
    if (!customAppbar) {
      return _style;
    }
    _style += ` top:${wrapStyle?.height ?? 0};`;
    return _style;
  }, [customAppbar, duration, opacity, style, wrapStyle, zIndex]);
  const overlayElement = (
    <View
      {...restProps}
      style={mergedStyle}
      className={`__overlay__ ${className ?? ""}`}
      onClick={(eve) => {
        eve.stopPropagation();
        props?.onClick?.(eve);
      }}
    >
      {props?.children}
    </View>
  );
  return withoutTransition ? (
    overlayElement
  ) : (
    <Transition show={!!show} name="fade">
      {overlayElement}
    </Transition>
  );
};

export default Overlay;
