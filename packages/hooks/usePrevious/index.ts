import { useRef } from "react";

export declare type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

const usePrevious = <T>(
  state: T,
  compare?: compareFunction<T>
): T | undefined => {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  const needUpdate =
    typeof compare === "function" ? compare(curRef.current, state) : true;
  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
};

export default usePrevious;
