import React, { Component } from "react";
import { setClipboardData } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Icon } from "@vyron/mini-ui";
import "./index.less";

// 内置icons
const INSET_ICONS = [
  "empty",
  "empty-filled",
  "500",
  "network-error",
  "error-img",
  "default-img",
  "close",
  "back",
];
export default class IconExample extends Component {
  render() {
    return (
      <View className="icons">
        {INSET_ICONS.map((icon) => (
          <View
            className="icon"
            key={icon}
            onClick={(e) => {
              e.stopPropagation();
              console.log(`内容复制成功: <Icon type="icon-${icon}" />`);
              setClipboardData({
                data: `<Icon type="icon-${icon}" />`,
              });
            }}
          >
            <Icon size="60rpx" type={`icon-${icon}`} />
            <Text className="icon-name">{icon}</Text>
          </View>
        ))}
      </View>
    );
  }
}
