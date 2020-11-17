import { useState, useCallback } from "react";

const useUpdate = () => {
  const [, setState] = useState(false);
  return useCallback(() => setState((bol: boolean): boolean => !bol), []);
};

export default useUpdate;
