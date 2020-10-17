import { useEffect, useRef } from "react";

export declare type fn = (...args: any) => void;

const useMount = (fns: fn | fn[]) => {
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
