import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

export default class Index extends React.Component {
  navigator = (dir) => {
    Taro.navigateTo({ url: `/pages/${dir}/index` });
  };
  render() {
    return (
      <View className="wrap">
        <View className="item" onClick={() => this.navigator("appbar")}>
          Appbar
        </View>
      </View>
    );
  }
}
