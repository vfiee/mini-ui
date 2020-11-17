import { useRef, useEffect } from "react";

export declare type cProps = {
  [key: string]: any;
};

const useWhyUpdate = (componentName: string, props: cProps) => {
  const previousProps = useRef<cProps>({});
  useEffect(() => {
    if (previousProps.current) {
      const keys = Object.keys({ ...previousProps.current, ...props });
      let changedProps: cProps = {};
      keys.forEach((key) => {
        if (previousProps[key] !== props[key]) {
          changedProps[key] = {
            prev: previousProps.current[key],
            next: props[key],
          };
        }
      });
      if (Object.keys(changedProps).length > 0) {
        console.log(`why-${componentName}-update:`, changedProps);
      }
    }
    previousProps.current = props;
  });
};

export default useWhyUpdate;
