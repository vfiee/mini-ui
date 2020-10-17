import { __rest, __assign } from 'tslib';
import React from 'react';
import { useTransition } from '@vyron/mini-components/lib/hooks';
import { mergeStyle } from '@vyron/mini-components/lib/utils';

var Transition = function (props) {
    var _a;
    var name = props.name, show = props.show, _b = props.duration, duration = _b === void 0 ? 300 : _b;
    var _c = useTransition({
        show: show,
        name: name,
        transitionDuration: duration,
    }), inited = _c.inited, display = _c.display, className = _c.className, onTransitionEnd = _c.onTransitionEnd, transitionDuration = _c.transitionDuration;
    if (!inited)
        return null;
    var _d = props.children, type = _d.type, _props = _d.props, otherProps = __rest(_d, ["type", "props"]);
    return React.createElement(type, __assign(__assign(__assign({}, otherProps), _props), { onTransitionEnd: onTransitionEnd, className: "__transition__ " + className + " " + ((_a = _props === null || _props === void 0 ? void 0 : _props.className) !== null && _a !== void 0 ? _a : ""), style: "transition-duration:" + transitionDuration + "ms;" + (display ? "" : "display:none;") + (_props.style ? mergeStyle(_props.style) : "") }));
};

export default Transition;
//# sourceMappingURL=index.js.map
