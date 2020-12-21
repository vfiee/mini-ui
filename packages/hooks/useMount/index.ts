import { useEffect, useRef } from "react";

export declare type Fn = (...args: any) => void;

const useMount = (fns: Fn | Fn[]) => {
  const fnsRef = useRef(fns);
  useEffect(() => {
    const current = fnsRef.current;
    if (!current) return;
    if (typeof current === "function") {
      current();
    } else if (Array.isArray(current)) {
      current.forEach((fn) => {
        fn && typeof fn === "function" && fn();
      });
    }
  }, []);
};

export default useMount;
