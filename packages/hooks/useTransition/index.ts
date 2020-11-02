import { useEffect, useCallback, useRef } from "react";
import { requestAnimationFrame } from "utils";
import { useUpdate } from "hooks";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionType, TransitionStatus, BaseObject } from "types";

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
  const statusRef = useRef<BaseObject>({
    inited: false,
    display: !!show,
    className: "",
  });
  const update = useUpdate();

  let status = useRef<TransitionStatus | null>();
  let isTransitionEnd = useRef<boolean>(false);

  const onTransitionEnd = useCallback(() => {
    if (isTransitionEnd.current) return;
    status.current = null;
    isTransitionEnd.current = true;
    statusRef.current = {
      ...statusRef.current,
      className: "",
    };
    if (!show && statusRef.current.display) {
      statusRef.current = {
        ...statusRef.current,
        display: false,
      };
    }
    update();
  }, [show, update]);

  const enter = useCallback(() => {
    status.current = "enter";
    const classes = getClassNames(name);
    beforeEnter && beforeEnter();
    requestAnimationFrame(() => {
      onEnter && onEnter();
      statusRef.current = {
        inited: true,
        display: true,
        className: classes.enter,
      };
      update();
      requestAnimationFrame(() => {
        status.current = "enterTo";
        isTransitionEnd.current = false;
        statusRef.current = {
          ...statusRef.current,
          className: classes.enterTo,
        };
        update();
      });
    });
  }, [beforeEnter, name, onEnter, update]);

  const leave = useCallback(() => {
    status.current = "leave";
    const classes = getClassNames(name);
    beforeLeave && beforeLeave();
    requestAnimationFrame(() => {
      onLeave && onLeave();
      statusRef.current = {
        ...statusRef.current,
        className: classes.leave,
      };
      update();
      requestAnimationFrame(() => {
        status.current = "leaveTo";
        isTransitionEnd.current = false;
        setTimeout(() => onTransitionEnd(), transitionDuration * 1000);
        statusRef.current = {
          ...statusRef.current,
          className: classes.leaveTo,
        };
        update();
      });
    });
  }, [beforeLeave, name, onLeave, onTransitionEnd, transitionDuration, update]);

  useEffect(() => {
    show ? enter() : leave();
  }, [enter, leave, show]);

  return {
    status,
    onTransitionEnd,
    transitionDuration,
    inited: statusRef.current.inited,
    display: statusRef.current.display,
    className: statusRef.current.className,
  };
};

export default useTransition;
