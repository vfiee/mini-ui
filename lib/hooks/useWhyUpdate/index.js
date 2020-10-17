import { __assign } from 'tslib';
import { useRef, useEffect } from 'react';

var useWhyUpdate = function (componentName, props) {
    var previousProps = useRef({});
    useEffect(function () {
        if (previousProps.current) {
            var keys = Object.keys(__assign(__assign({}, previousProps.current), props));
            var changedProps_1 = {};
            keys.forEach(function (key) {
                if (previousProps[key] !== props[key]) {
                    changedProps_1[key] = {
                        prev: previousProps.current[key],
                        next: props[key],
                    };
                }
            });
            if (Object.keys(changedProps_1).length > 0) {
                console.log("why-" + componentName + "-update:", changedProps_1);
            }
        }
        previousProps.current = props;
    });
};

export default useWhyUpdate;
//# sourceMappingURL=index.js.map
