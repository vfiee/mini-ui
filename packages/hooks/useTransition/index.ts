import { useEffect, useCallback, useRef } from "react";
import { requestAnimationFrame } from "utils";
import { useUpdate, usePrevious } from "hooks";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionType, TransitionStatus } from "types";

const getClassNames = (name: TransitionType) => ({
  enter: `__${name}__enter__ __${name}__enter__active__ ${name}-enter-active`,
  enterTo: `__${name}__enter__to__ __${name}__enter__active__ ${name}-enter-active`,
  leave: `__${name}__leave__ __${name}__leave__active__ ${name}-leave-active`,
  leaveTo: `__${name}__leave__to__ __${name}__leave__active__ ${name}-leave-active`
});

// 借鉴 Vant
export declare interface useTransitionProps {
  show: boolean;
  name: TransitionType;
  duration: number; //ms
  beforeEnter?: Function;
  onEnter?: Function;
  afterEnter?: Function;
  beforeLeave?: Function;
  onLeave?: Function;
  afterLeave?: Function;
}

export declare interface transitionRefStatus {
  inited: boolean;
  display: boolean;
  className: string;
  progress: TransitionStatus | null;
  transitionEnd: boolean;
}

const useTransition = (props: useTransitionProps) => {
  const {
    show,
    name,
    beforeEnter,
    onEnter,
    afterEnter,
    beforeLeave,
    onLeave,
    afterLeave,
    duration
  } = props;
  const previouseShow = usePrevious(show);
  const statusRef = useRef<transitionRefStatus>({
    inited: false,
    display: !!show,
    className: "",
    progress: null,
    transitionEnd: true
  });
  const update = useUpdate();

  const checkStatus = (status: TransitionStatus) => {
    if (statusRef.current.progress !== status) {
      throw Error(
        `current status(${statusRef.current.progress}) is not checkStatus(${status})`
      );
    }
  };

  const onTransitionEnd = useCallback(() => {
    if (statusRef.current.transitionEnd) return;
    if (statusRef.current.progress === "enterTo") {
      afterEnter?.();
    } else if (statusRef.current.progress === "leaveTo") {
      afterLeave?.();
    }
    statusRef.current = {
      ...statusRef.current,
      className: "",
      progress: null,
      transitionEnd: true
    };
    if (!show && statusRef.current.display) {
      statusRef.current = {
        ...statusRef.current,
        display: false
      };
      update();
    }
  }, [afterEnter, afterLeave, show, update]);

  const enter = useCallback(() => {
    statusRef.current.progress = "enter";
    const classes = getClassNames(name);
    beforeEnter?.();
    requestAnimationFrame(() => {
      checkStatus("enter");
      onEnter?.();
      statusRef.current = {
        ...statusRef.current,
        inited: true,
        display: true,
        className: classes.enter,
        transitionEnd: false
      };
      update();
      requestAnimationFrame(() => {
        checkStatus("enter");
        statusRef.current = {
          ...statusRef.current,
          progress: "enterTo",
          className: classes.enterTo
        };
        update();
      });
    });
  }, [beforeEnter, name, onEnter, update]);

  const leave = useCallback(() => {
    if (!statusRef.current.inited) {
      return;
    }
    statusRef.current.progress = "leave";

    const classes = getClassNames(name);
    beforeLeave?.();
    requestAnimationFrame(() => {
      checkStatus("leave");
      onLeave?.();
      statusRef.current = {
        ...statusRef.current,
        transitionEnd: false,
        className: classes.leave
      };
      update();
      requestAnimationFrame(() => {
        checkStatus("leave");
        statusRef.current = {
          ...statusRef.current,
          progress: "leaveTo",
          className: classes.leaveTo
        };
        update();
      });
    });
  }, [beforeLeave, name, onLeave, update]);

  useEffect(() => {
    if (show === previouseShow) {
      return;
    }
    show ? enter() : leave();
  }, [enter, leave, previouseShow, show]);

  return {
    duration,
    onTransitionEnd,
    status: statusRef.current.progress,
    inited: statusRef.current.inited,
    display: statusRef.current.display,
    className: statusRef.current.className
  };
};

export default useTransition;
