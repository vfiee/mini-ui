import { useState, useEffect } from 'react';
import { requestAnimationFrame } from '@vyron/mini-components/lib/utils';

var getClassNames = function (name) { return ({
    enter: "__" + name + "__enter__ __" + name + "__enter__active__ " + name + "-enter-active",
    enterTo: "__" + name + "__enter__to__ __" + name + "__enter__active__ " + name + "-enter-active",
    leave: "__" + name + "__leave__ __" + name + "__leave__active__ " + name + "-leave-active",
    leaveTo: "__" + name + "__leave__to__ __" + name + "__leave__active__ " + name + "-leave-active",
}); };
var useTransition = function (props) {
    var show = props.show, name = props.name, beforeEnter = props.beforeEnter, onEnter = props.onEnter, beforeLeave = props.beforeLeave, onLeave = props.onLeave, transitionDuration = props.transitionDuration;
    var _a = useState(false), inited = _a[0], setInited = _a[1];
    var _b = useState(show), display = _b[0], setDisplay = _b[1];
    var _c = useState(""), className = _c[0], setClassName = _c[1];
    useEffect(function () {
        if (show === display) {
            return;
        }
        show ? enter() : leave();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);
    var status = null;
    var transitionEnded;
    function enter() {
        status = "enter";
        var classes = getClassNames(name);
        beforeEnter && beforeEnter();
        requestAnimationFrame(function () {
            onEnter && onEnter();
            !inited && setInited(true);
            setDisplay(true);
            setClassName(classes.enter);
            requestAnimationFrame(function () {
                status = "enterTo";
                transitionEnded = false;
                setClassName(classes.enterTo);
            });
        });
    }
    function leave() {
        status = "leave";
        var classes = getClassNames(name);
        beforeLeave && beforeLeave();
        requestAnimationFrame(function () {
            onLeave && onLeave();
            setClassName(classes.leave);
            requestAnimationFrame(function () {
                status = "leaveTo";
                transitionEnded = false;
                setTimeout(function () { return onTransitionEnd(); }, transitionDuration);
                setClassName(classes.leaveTo);
            });
        });
    }
    function onTransitionEnd() {
        if (transitionEnded)
            return;
        status = null;
        transitionEnded = true;
        // setClassName("");
        if (!show && display) {
            setDisplay(false);
        }
    }
    return {
        inited: inited,
        status: status,
        display: display,
        className: className,
        transitionDuration: transitionDuration,
        onTransitionEnd: onTransitionEnd,
    };
};

export default useTransition;
//# sourceMappingURL=index.js.map
