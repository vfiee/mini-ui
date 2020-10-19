import React, {
  isValidElement,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { ScrollView, View, Slot } from "@tarojs/components";
import Loading from "components/loading";
import { isEmpty, isFunction, isReactComponentType } from "utils";
import { useMount, useUpdate } from "hooks";
import { ListProps } from "types";

declare enum PullingStatus {
  static,
  pulling,
  overPulling,
  loading,
  success,
  error,
}

const pullStatusText = [
  "",
  "下拉刷新",
  "松开手刷新",
  "正在加载...",
  "加载成功",
  "加载失败",
];

const defaultProps = {
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

const List = (props: ListProps) => {
  const {
    data,
    error,
    errorClass,
    errorStyle,
    errorText,
    loading,
    loadingText,
    loadingClass,
    loadingStyle,
    hasMore,
    className,
    onRefresh,
    onReachBottom,
    onRefreshCancel,
    firstTriggered,
    onRefresherRefresh,
    onRefresherAbort,
    onRefresherRestore,
    ListComponent,
    refresherThreshold,
    refresherStayTime,
    refresherDefaultStyle,
    refresherClassName,
    refresherStyle,
    ...restProps
  } = {
    ...defaultProps,
    ...props,
  };
  const update = useUpdate();
  const refresherRef = useRef<PullingStatus>(PullingStatus.static);
  const setRefresherStatus = useCallback(
    (status: PullingStatus) => {
      refresherRef.current = status;
      update();
    },
    [update]
  );
  const [bottomState, setBottomState] = useState({
    loading: false,
    error: false,
  });
  useMount(() => {
    if (firstTriggered) {
      setTimeout(() => {
        setRefresherStatus(PullingStatus.loading);
      }, 0);
    }
  });

  // 下拉动作
  const _onRefresherPulling = useCallback(
    (eve) => {
      if (refresherRef.current < PullingStatus.loading) {
        const { dy } = eve.detail;
        setRefresherStatus(
          dy >= refresherThreshold
            ? PullingStatus.overPulling
            : PullingStatus.pulling
        );
      }
    },
    [refresherThreshold, setRefresherStatus]
  );

  // 触发下拉刷新
  const _onRefresherRefresh = useCallback(
    (eve) => {
      if (refresherRef.current !== PullingStatus.loading) {
        setRefresherStatus(PullingStatus.loading);
      }
      const resetStatus = () => {
        if (refresherRef.current !== PullingStatus.static) {
          setTimeout(() => {
            setRefresherStatus(PullingStatus.static);
          }, refresherStayTime);
        }
      };
      isFunction(onRefresh) &&
        (onRefresh as Function)([
          () => {
            if (refresherRef.current === PullingStatus.loading) {
              setRefresherStatus(PullingStatus.success);
            }
            resetStatus();
          },
          () => {
            if (refresherRef.current === PullingStatus.loading) {
              setRefresherStatus(PullingStatus.error);
            }
            resetStatus();
          },
        ]);
      isFunction(onRefresherRefresh) && (onRefresherRefresh as Function)(eve);
    },
    [onRefresh, onRefresherRefresh, refresherStayTime, setRefresherStatus]
  );

  // 下拉刷新被终止
  const _onRefresherAbort = useCallback(
    (eve) => {
      if (refresherRef.current !== PullingStatus.static) {
        setRefresherStatus(PullingStatus.static);
      }
      isFunction(onRefresherAbort) && (onRefresherAbort as Function)(eve);
    },
    [onRefresherAbort, setRefresherStatus]
  );

  // 下拉刷新复位
  const _onRefresherRestore = useCallback(
    (eve) => {
      if (refresherRef.current !== PullingStatus.static) {
        debugger;
        setRefresherStatus(PullingStatus.static);
      }
      isFunction(onRefreshCancel) && (onRefreshCancel as Function)();
      isFunction(onRefresherRestore) && (onRefresherRestore as Function)(eve);
    },
    [onRefreshCancel, onRefresherRestore, setRefresherStatus]
  );

  // 滚动到底部
  const onScrollToBottom = useCallback(
    ({ force = false } = {}, eve) => {
      if (!hasMore && (bottomState.loading || bottomState.error) && !force) {
        return;
      }
      setBottomState({
        loading: true,
        error: false,
      });
      isFunction(onReachBottom) &&
        (onReachBottom as Function)(
          [
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
          ],
          eve
        );
    },
    [bottomState.error, bottomState.loading, onReachBottom, hasMore]
  );

  const bottomComponent = useMemo<React.ReactElement | null>(() => {
    if (bottomState.loading) {
      return isValidElement(loading) ? (
        loading
      ) : (
        <Loading
          block
          size="40rpx"
          style={loadingStyle ?? {}}
          className={`__list__loading__ ${loadingClass ?? ""}`}
        >
          {loadingText}
        </Loading>
      );
    } else if (bottomState.error) {
      return isValidElement(error) ? (
        React.cloneElement(error, {
          onClick: (eve) => {
            error?.props?.onClick?.(eve);
            onScrollToBottom({ force: true }, eve);
          },
        })
      ) : (
        <View
          style={errorStyle}
          className={`__list__error__ ${errorClass ?? ""}`}
          onClick={(eve) => onScrollToBottom({ force: true }, eve)}
        >
          {errorText}
        </View>
      );
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

  return (
    <ScrollView
      {...restProps}
      refresherThreshold={refresherThreshold}
      onRefresherPulling={_onRefresherPulling}
      onRefresherRefresh={_onRefresherRefresh}
      onRefresherAbort={_onRefresherAbort}
      onRefresherRestore={_onRefresherRestore}
      refresherDefaultStyle={refresherDefaultStyle}
      onScrollToLower={(eve) => onScrollToBottom(undefined, eve)}
      refresherTriggered={refresherRef.current !== PullingStatus.static}
      className={`__list__ ${className ?? ""}`}
    >
      {refresherDefaultStyle === "none" && (
        <Slot name="refresher">
          <View
            style={refresherStyle}
            className={`__refresher__ ${refresherClassName ?? ""}`}
          >
            {pullStatusText[refresherRef.current]}
          </View>
        </Slot>
      )}
      {props?.children}
      {!isEmpty(data) &&
        isReactComponentType(ListComponent) &&
        data?.map((_data, index) => (
          // @ts-ignore
          <ListComponent data={_data} key={_data?.id || index} />
        ))}
      {bottomComponent}
    </ScrollView>
  );
};

List.options = {
  addGlobalClass: true,
};

export default List;
