import { useRef, useEffect } from 'react';

var useUpdateEffect = function (effect, deps) {
    var isMount = useRef(false);
    useEffect(function () {
        if (!isMount.current) {
            isMount.current = true;
        }
        else {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useUpdateEffect;
//# sourceMappingURL=index.js.map
