import { __assign, __rest } from 'tslib';
import React, { useRef, useCallback, useState, useMemo, isValidElement } from 'react';
import { View, ScrollView, Slot } from '@tarojs/components';
import Loading from '@vyron/mini-components/lib/components/loading';
import { isFunction, isEmpty, isReactComponentType } from '@vyron/mini-components/lib/utils';
import { useUpdate, useMount } from '@vyron/mini-components/lib/hooks';
import { PullingStatus } from 'types';

var pullStatusText = [
    "",
    "下拉刷新",
    "松开手刷新",
    "正在加载...",
    "加载成功",
    "加载失败",
];
var defaultProps = {
    scrollY: true,
    hasMore: true,
    firstTriggered: false,
    refresherEnabled: true,
    lowerThreshold: 80,
    loadingText: "加载中...",
    errorText: "请求失败,点击重新加载",
    refresherDefaultStyle: "none",
    refresherThreshold: 50,
    refresherBackground: "#00ab84",
    refresherStayTime: 700,
};
var List = function (props) {
    var _a = __assign(__assign({}, defaultProps), props), data = _a.data, error = _a.error, errorClass = _a.errorClass, errorStyle = _a.errorStyle, errorText = _a.errorText, loading = _a.loading, loadingText = _a.loadingText, loadingClass = _a.loadingClass, loadingStyle = _a.loadingStyle, hasMore = _a.hasMore, className = _a.className, onRefresh = _a.onRefresh, onReachBottom = _a.onReachBottom, onRefreshCancel = _a.onRefreshCancel, firstTriggered = _a.firstTriggered, onRefresherRefresh = _a.onRefresherRefresh, onRefresherAbort = _a.onRefresherAbort, onRefresherRestore = _a.onRefresherRestore, ListComponent = _a.ListComponent, refresherThreshold = _a.refresherThreshold, refresherStayTime = _a.refresherStayTime, refresherDefaultStyle = _a.refresherDefaultStyle, refresherClassName = _a.refresherClassName, refresherStyle = _a.refresherStyle, restProps = __rest(_a, ["data", "error", "errorClass", "errorStyle", "errorText", "loading", "loadingText", "loadingClass", "loadingStyle", "hasMore", "className", "onRefresh", "onReachBottom", "onRefreshCancel", "firstTriggered", "onRefresherRefresh", "onRefresherAbort", "onRefresherRestore", "ListComponent", "refresherThreshold", "refresherStayTime", "refresherDefaultStyle", "refresherClassName", "refresherStyle"]);
    var update = useUpdate();
    var refresherRef = useRef(PullingStatus.static);
    var setRefresherStatus = useCallback(function (status) {
        refresherRef.current = status;
        update();
    }, [update]);
    var _b = useState({
        loading: false,
        error: false,
    }), bottomState = _b[0], setBottomState = _b[1];
    useMount(function () {
        if (firstTriggered) {
            setTimeout(function () {
                setRefresherStatus(PullingStatus.loading);
            }, 0);
        }
    });
    // 下拉动作
    var _onRefresherPulling = useCallback(function (eve) {
        if (refresherRef.current < PullingStatus.loading) {
            var dy = eve.detail.dy;
            setRefresherStatus(dy >= refresherThreshold
                ? PullingStatus.overPulling
                : PullingStatus.pulling);
        }
    }, [refresherThreshold, setRefresherStatus]);
    // 触发下拉刷新
    var _onRefresherRefresh = useCallback(function (eve) {
        if (refresherRef.current !== PullingStatus.loading) {
            setRefresherStatus(PullingStatus.loading);
        }
        var resetStatus = function () {
            if (refresherRef.current !== PullingStatus.static) {
                setTimeout(function () {
                    setRefresherStatus(PullingStatus.static);
                }, refresherStayTime);
            }
        };
        isFunction(onRefresh) &&
            onRefresh([
                function () {
                    if (refresherRef.current === PullingStatus.loading) {
                        setRefresherStatus(PullingStatus.success);
                    }
                    resetStatus();
                },
                function () {
                    if (refresherRef.current === PullingStatus.loading) {
                        setRefresherStatus(PullingStatus.error);
                    }
                    resetStatus();
                },
            ]);
        isFunction(onRefresherRefresh) && onRefresherRefresh(eve);
    }, [onRefresh, onRefresherRefresh, refresherStayTime, setRefresherStatus]);
    // 下拉刷新被终止
    var _onRefresherAbort = useCallback(function (eve) {
        if (refresherRef.current !== PullingStatus.static) {
            setRefresherStatus(PullingStatus.static);
        }
        isFunction(onRefresherAbort) && onRefresherAbort(eve);
    }, [onRefresherAbort, setRefresherStatus]);
    // 下拉刷新复位
    var _onRefresherRestore = useCallback(function (eve) {
        if (refresherRef.current !== PullingStatus.static) {
            debugger;
            setRefresherStatus(PullingStatus.static);
        }
        isFunction(onRefreshCancel) && onRefreshCancel();
        isFunction(onRefresherRestore) && onRefresherRestore(eve);
    }, [onRefreshCancel, onRefresherRestore, setRefresherStatus]);
    // 滚动到底部
    var onScrollToBottom = useCallback(function (_a, eve) {
        var _b = (_a === void 0 ? {} : _a).force, force = _b === void 0 ? false : _b;
        if (!hasMore && (bottomState.loading || bottomState.error) && !force) {
            return;
        }
        setBottomState({
            loading: true,
            error: false,
        });
        isFunction(onReachBottom) &&
            onReachBottom([
                function stopLoading() {
                    setBottomState({
                        loading: false,
                        error: false,
                    });
                },
                function onError() {
                    setBottomState({
                        loading: false,
                        error: true,
                    });
                },
            ], eve);
    }, [bottomState.error, bottomState.loading, onReachBottom, hasMore]);
    var bottomComponent = useMemo(function () {
        if (bottomState.loading) {
            return isValidElement(loading) ? (loading) : (React.createElement(Loading, { block: true, size: "40rpx", style: loadingStyle !== null && loadingStyle !== void 0 ? loadingStyle : {}, className: "__list__loading__ " + (loadingClass !== null && loadingClass !== void 0 ? loadingClass : "") }, loadingText));
        }
        else if (bottomState.error) {
            return isValidElement(error) ? (React.cloneElement(error, {
                onClick: function (eve) {
                    var _a, _b;
                    (_b = (_a = error === null || error === void 0 ? void 0 : error.props) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, eve);
                    onScrollToBottom({ force: true }, eve);
                },
            })) : (React.createElement(View, { style: errorStyle, className: "__list__error__ " + (errorClass !== null && errorClass !== void 0 ? errorClass : ""), onClick: function (eve) { return onScrollToBottom({ force: true }, eve); } }, errorText));
        }
        return null;
    }, [
        bottomState.loading,
        bottomState.error,
        loading,
        loadingStyle,
        loadingClass,
        loadingText,
        error,
        errorStyle,
        errorClass,
        errorText,
        onScrollToBottom,
    ]);
    return (React.createElement(ScrollView, __assign({}, restProps, { refresherThreshold: refresherThreshold, onRefresherPulling: _onRefresherPulling, onRefresherRefresh: _onRefresherRefresh, onRefresherAbort: _onRefresherAbort, onRefresherRestore: _onRefresherRestore, refresherDefaultStyle: refresherDefaultStyle, onScrollToLower: function (eve) { return onScrollToBottom(undefined, eve); }, refresherTriggered: refresherRef.current !== PullingStatus.static, className: "__list__ " + (className !== null && className !== void 0 ? className : "") }),
        refresherDefaultStyle === "none" && (React.createElement(Slot, { name: "refresher" },
            React.createElement(View, { style: refresherStyle, className: "__refresher__ " + (refresherClassName !== null && refresherClassName !== void 0 ? refresherClassName : "") }, pullStatusText[refresherRef.current]))), props === null || props === void 0 ? void 0 :
        props.children,
        !isEmpty(data) &&
            isReactComponentType(ListComponent) && (data === null || data === void 0 ? void 0 : data.map(function (_data, index) { return (
        // @ts-ignore
        React.createElement(ListComponent, { data: _data, key: (_data === null || _data === void 0 ? void 0 : _data.id) || index })); })),
        bottomComponent));
};
List.options = {
    addGlobalClass: true,
};

export default List;
//# sourceMappingURL=index.js.map
