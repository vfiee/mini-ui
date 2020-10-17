import { useRef, useEffect } from 'react';

var useUnmount = function (fns) {
    var fnsRef = useRef(fns);
    useEffect(function () { return function () {
        var current = fnsRef.current;
        if (!current)
            return;
        if (typeof current === "function") {
            current();
        }
        else if (Array.isArray(current)) {
            current.forEach(function (fnc) {
                fnc && typeof fnc === "function" && fnc();
            });
        }
    }; }, []);
};

export default useUnmount;
//# sourceMappingURL=index.js.map
