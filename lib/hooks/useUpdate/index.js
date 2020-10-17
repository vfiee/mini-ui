import { useState, useCallback } from 'react';

var useUpdate = function () {
    var _a = useState(false), setState = _a[1];
    return useCallback(function () { return setState(function (bol) { return !bol; }); }, []);
};

export default useUpdate;
//# sourceMappingURL=index.js.map
