import { useRef } from "react";
import { getSystemInfoSync } from "utils";
import { useMount } from "hooks";

const useSystemInfo = () => {
  const sysRef = useRef(getSystemInfoSync());
  useMount(() => {
    if (sysRef.current == null) {
      sysRef.current = getSystemInfoSync();
    }
  });
  return sysRef.current;
};

export default useSystemInfo;
