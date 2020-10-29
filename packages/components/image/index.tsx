import React, { useState, isValidElement, useMemo } from "react";
import { View, Image } from "@tarojs/components";
import Icon from "components/icon";
import { mergeStyle, delayExecution } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageProps } from "types";

const defaultImageProps = {
  showError: false,
  showLoading: false,
  loading: "icon-default-img",
  error: "icon-error-img",
};

const Component = (props: ImageProps) => {
  const {
    showLoading,
    loading,
    showError,
    error,
    round,
    radius,
    width,
    height,
    onLoad,
    onError,
    delay,
    className,
    style,
    ...restProps
  } = {
    ...defaultImageProps,
    ...props,
  };
  const [status, setStatus] = useState({
    error: !props?.src,
    loading: !!props?.src,
  });
  function _onLoad(eve) {
    delayExecution(() => {
      setStatus({ loading: false, error: false });
    }, delay);
    onLoad && onLoad(eve);
  }
  function _onError(eve) {
    delayExecution(() => {
      setStatus({ loading: false, error: true });
    }, delay);
    onError && onError(eve);
  }
  const memoStyle = useMemo(() => {
    return mergeStyle(
      {
        width,
        height,
        borderRadius: radius,
      },
      style
    );
  }, [height, radius, style, width]);

  return (
    <View
      className={`__image__ ${round ? `__image__round__` : ""} ${
        className ?? ""
      }`}
      style={memoStyle}
    >
      {!status.error && (
        <Image
          {...restProps}
          onLoad={_onLoad}
          onError={_onError}
          className="__image__origin__"
        />
      )}
      {showLoading && status.loading && (
        <View className="__image__loading__">
          {isValidElement(loading) ? (
            loading
          ) : (
            // @ts-ignore
            <Icon type={loading} size="32px" />
          )}
        </View>
      )}
      {showError && status.error && (
        <View className="__image__error__">
          {isValidElement(error) ? (
            error
          ) : (
            // @ts-ignore
            <Icon type={error} size="32px" />
          )}
        </View>
      )}
      {props?.children}
    </View>
  );
};

Component.options = {
  addGlobalClass: true,
};

export default Component;
