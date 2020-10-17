import { useEffect, useState } from "react";
import { requestAnimationFrame } from "utils";

// TODO: remove TransitionType to types/transition
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

declare type TransitionStatus = "enter" | "enterTo" | "leave" | "leaveTo";

const getClassNames = (name: TransitionType) => ({
  enter: `__${name}__enter__ __${name}__enter__active__ ${name}-enter-active`,
  enterTo: `__${name}__enter__to__ __${name}__enter__active__ ${name}-enter-active`,
  leave: `__${name}__leave__ __${name}__leave__active__ ${name}-leave-active`,
  leaveTo: `__${name}__leave__to__ __${name}__leave__active__ ${name}-leave-active`,
});

export declare interface useTransitionProps {
  show: boolean;
  name: TransitionType;
  transitionDuration: number; //ms
  beforeEnter?: Function;
  onEnter?: Function;
  beforeLeave?: Function;
  onLeave?: Function;
}

const useTransition = (props: useTransitionProps) => {
  const {
    show,
    name,
    beforeEnter,
    onEnter,
    beforeLeave,
    onLeave,
    transitionDuration,
  } = props;
  const [inited, setInited] = useState(false);
  const [display, setDisplay] = useState(show);
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (show === display) {
      return;
    }
    show ? enter() : leave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  let status: null | TransitionStatus = null;
  let transitionEnded: boolean;
  function enter() {
    status = "enter";
    const classes = getClassNames(name);
    beforeEnter && beforeEnter();
    requestAnimationFrame(() => {
      onEnter && onEnter();
      !inited && setInited(true);
      setDisplay(true);
      setClassName(classes.enter);
      requestAnimationFrame(() => {
        status = "enterTo";
        transitionEnded = false;
        setClassName(classes.enterTo);
      });
    });
  }
  function leave() {
    status = "leave";
    const classes = getClassNames(name);
    beforeLeave && beforeLeave();
    requestAnimationFrame(() => {
      onLeave && onLeave();
      setClassName(classes.leave);
      requestAnimationFrame(() => {
        status = "leaveTo";
        transitionEnded = false;
        setTimeout(() => onTransitionEnd(), transitionDuration);
        setClassName(classes.leaveTo);
      });
    });
  }
  function onTransitionEnd() {
    if (transitionEnded) return;
    status = null;
    transitionEnded = true;
    // setClassName("");
    if (!show && display) {
      setDisplay(false);
    }
  }
  return {
    inited,
    status,
    display,
    className,
    transitionDuration,
    onTransitionEnd,
  };
};

export default useTransition;
