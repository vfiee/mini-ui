import { useEffect, useRef } from "react";

declare type fn = (...args: any) => void;

const useUnmount = (fns: fn | fn[]) => {
  const fnsRef = useRef(fns);
  useEffect(
    () => () => {
      const current = fnsRef.current;
      if (!current) return;
      if (typeof current === "function") {
        current();
      } else if (Array.isArray(current)) {
        current.forEach(fnc => {
          fnc && typeof fnc === "function" && fnc();
        });
      }
    },
    []
  );
};

export default useUnmount;
