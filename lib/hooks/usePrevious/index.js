import { useRef } from 'react';

var usePrevious = function (state, compare) {
    var prevRef = useRef();
    var curRef = useRef();
    var needUpdate = typeof compare === "function" ? compare(curRef.current, state) : true;
    if (needUpdate) {
        prevRef.current = curRef.current;
        curRef.current = state;
    }
    return prevRef.current;
};

export default usePrevious;
//# sourceMappingURL=index.js.map
