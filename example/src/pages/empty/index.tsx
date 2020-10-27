import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Empty } from "@vyron/mini-ui";
import "./index.less";

export default class EmptyExample extends Component {
  render() {
    console.log(Empty);
    return (
      <View className="empty">
        <Empty />
      </View>
    );
  }
}
