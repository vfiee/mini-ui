import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Empty } from "@vyron/mini-ui";
import "./index.less";

export default class EmptyExample extends Component {
  render() {
    return (
      <View className="empty">
        <Empty description="默认空白" />
        <Empty image="error" description="服务器错误" />
        <Empty image="network" description="网络错误" />
        <Empty
          image={{
            size: "160rpx",
            color: "#ff6767",
            type: `icon-network-error`,
          }}
        >
          <View className="custom-empty">自定义empty</View>
          <View className="btn">点击重试</View>
        </Empty>
      </View>
    );
  }
}
