import React, { useMemo } from "react";
import { View, Image, CoverView, CoverImage } from "@tarojs/components";
import { mergeStyle, isImage } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconProps } from "types";

const Icon = (props: IconProps) => {
  const {
    type,
    size,
    color,
    style,
    localImage,
    className,
    fontFamily,
    isCover,
    ...restProps
  } = props;
  const isImageType =
    localImage || (/^https?:\/\//.test(type) && isImage(type));
  const mergedStyle = useMemo(
    () =>
      mergeStyle(
        {
          color: color ?? "",
          fontSize: size ?? "",
        },
        style
      ),
    [style, color, size]
  );

  const CView = useMemo(() => (isCover ? CoverView : View), [isCover]);

  const CImage = useMemo(() => (isCover ? CoverImage : Image), [isCover]);

  const imageProps = useMemo(() => {
    let _props = {
      src: type,
      className: "__icon__origin__image__",
    };
    if (!isCover) {
      _props["mode"] = "aspectFill";
    }
    return _props;
  }, [isCover, type]);

  return (
    <CView
      {...restProps}
      style={mergedStyle}
      className={`__icon__ ${isImageType ? `__icon__image__` : fontFamily} ${
        isImageType ? "" : type
      } ${className ?? ""}`}
    >
      {isImageType && <CImage {...imageProps} />}
      {props?.children}
    </CView>
  );
};

Icon.displayName = "Icon";

Icon.options = {
  addGlobalClass: true,
};

Icon.defaultProps = {
  isCover: false,
  fontFamily: "iconfont",
};

export default Icon;
