import { __assign } from 'tslib';
import { useRef, useState } from 'react';
import { getMenuButtonBoundingClientRect, get } from '@vyron/mini-components/lib/utils';
import { useSystemInfo, useMount } from '@vyron/mini-components/lib/hooks';

var defaultMenuProps = {
    type: "white",
};
var defaultColors = {
    border: {
        black: "rgba(0,0,0,0.1)",
        white: "rgba(255,255,255,0.25)",
    },
    background: {
        black: "rgba(252,252,252,0.6)",
        white: "rgba(0,0,0,0.15)",
    },
    delimiter: {
        black: "rgba(0,0,0,0.1)",
        white: "rgba(255,255,255,0.3)",
    },
};
var useMenuButton = function (props) {
    if (props === void 0) { props = {}; }
    var typeStyle = __assign(__assign({}, defaultMenuProps), props).type;
    var rectRef = useRef(getMenuButtonBoundingClientRect());
    var systemInfo = useSystemInfo();
    var _a = useState({
        wrapStyle: {},
        menuStyle: {},
        delimiterStyle: {},
    }), style = _a[0], setStyle = _a[1];
    useMount(function () {
        var _a = rectRef.current, width = _a.width, height = _a.height, top = _a.top, right = _a.right;
        var screenWidth = systemInfo.screenWidth, statusBarHeight = systemInfo.statusBarHeight;
        setStyle({
            wrapStyle: {
                position: "fixed",
                zIndex: 1000,
                boxSizing: "border-box",
                width: screenWidth + "px",
                paddingTop: statusBarHeight + "px",
                paddingLeft: screenWidth - right + "px",
                paddingRight: screenWidth - right + "px",
                height: height + statusBarHeight + (top - statusBarHeight + 2) * 2 + "px",
            },
            menuStyle: {
                boxSizing: "border-box",
                width: width + "px",
                height: height + "px",
                borderRadius: height / 2 + "px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: get(defaultColors, "border." + typeStyle),
                backgroundColor: get(defaultColors, "background." + typeStyle),
            },
            delimiterStyle: {
                width: "1px",
                height: "18px",
                backgroundColor: get(defaultColors, "delimiter." + typeStyle),
            },
        });
    });
    return __assign(__assign({}, style), { system: systemInfo, rect: rectRef.current });
};

export default useMenuButton;
//# sourceMappingURL=index.js.map
