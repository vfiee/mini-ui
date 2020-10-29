import React, { Component } from "react";
import { Block, View } from "@tarojs/components";
import { Divider } from "@vyron/mini-ui";
import "./index.less";

export default class DividerExample extends Component {
  render() {
    console.log(Divider);
    return (
      <Block>
        <Divider text="默认分隔符" />
        <Divider text="左侧分隔符" position="left" />
        <Divider text="右侧分隔符" position="right" />
        <Divider text="自定义颜色" className="custom-color" />
        <Divider>
          <View className="custom-view">自定义显示内容</View>
        </Divider>
      </Block>
    );
  }
}
