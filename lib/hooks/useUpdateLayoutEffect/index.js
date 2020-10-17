import { useRef, useLayoutEffect } from 'react';

var useUpdateLayoutEffect = function (effect, deps) {
    var isMounted = useRef(false);
    useLayoutEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
        }
        else {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useUpdateLayoutEffect;
//# sourceMappingURL=index.js.map
