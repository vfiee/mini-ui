import React, { useState, isValidElement, useMemo } from "react";
import { View, Image as TaroImage } from "@tarojs/components";
import Icon from "components/icon";
import { mergeStyle, delayExecution } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageProps } from "types";

const Image = (props: ImageProps) => {
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
  } = props;
  const [status, setStatus] = useState({
    error: !props?.src,
    loading: !!props?.src
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
        borderRadius: radius
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
        <TaroImage
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

Image.displayName = "Image";

Image.options = {
  addGlobalClass: true
};

Image.defaultProps = {
  showError: false,
  showLoading: false,
  error: "icon-error-img",
  loading: "icon-default-img"
};

export default Image;
