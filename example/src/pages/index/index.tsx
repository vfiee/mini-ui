import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import * as MiniUi from "@vyron/mini-ui";
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
        <View className="item" onClick={() => this.navigator("authorize")}>
          Authorize
        </View>
        {/* <MiniUi.AppBar /> */}
      </View>
    );
  }
}
