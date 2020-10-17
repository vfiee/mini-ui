import { useRef } from 'react';
import { getSystemInfoSync } from '@vyron/mini-components/lib/utils';
import { useMount } from '@vyron/mini-components/lib/hooks';

var useSystemInfo = function () {
    var sysRef = useRef(getSystemInfoSync());
    useMount(function () {
        if (sysRef.current == null) {
            sysRef.current = getSystemInfoSync();
        }
    });
    return sysRef.current;
};

export default useSystemInfo;
//# sourceMappingURL=index.js.map
