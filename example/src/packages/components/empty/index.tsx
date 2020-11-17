import React from "react";
import { View } from "@tarojs/components";
import Icon from "components/icon";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconProps, DefaultIconProps, EmptyProps } from "types";

const defaultIcons: DefaultIconProps = {
  empty: {
    size: "160rpx",
    color: "#999",
    type: `icon-empty-filled`,
  },
  error: {
    size: "160rpx",
    color: "#999",
    type: `icon-network-error`,
  },
  network: {
    size: "160rpx",
    color: "#999",
    type: `icon-500`,
  },
};

const defaultIconTypes = ["empty", "network", "error"];

const Empty = (props: EmptyProps) => {
  let { image, className, description, ...restProps } = props;
  if (typeof image === "string") {
    image = defaultIconTypes.includes(image) ? image : "empty";
  }
  const iconProps: IconProps =
    typeof image === "string" ? defaultIcons[image] : (image as IconProps);
  return (
    <View {...restProps} className={`__empty__ ${className ?? ""}`}>
      <Icon {...iconProps} />
      {!!description && (
        <View className="__empty__description__">{description}</View>
      )}
      {props?.children}
    </View>
  );
};

Empty.displayName = "Empty";

Empty.options = {
  addGlobalClass: true,
};

Empty.defaultProps = {
  image: "empty",
};

export default Empty;
