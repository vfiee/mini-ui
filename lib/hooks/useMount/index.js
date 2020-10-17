import { useRef, useEffect } from 'react';

var useMount = function (fns) {
    var fnsRef = useRef(fns);
    useEffect(function () {
        var current = fnsRef.current;
        if (!current)
            return;
        if (typeof current === "function") {
            current();
        }
        else if (Array.isArray(current)) {
            current.forEach(function (fn) {
                fn && typeof fn === "function" && fn();
            });
        }
    }, []);
};

export default useMount;
//# sourceMappingURL=index.js.map
