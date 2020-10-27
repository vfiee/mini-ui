import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import * as MiniUI from "@vyron/mini-ui";
import "./index.less";

// console.log(MiniUI);

export default class Home extends React.Component {
  navigator = (dir) => {
    Taro.navigateTo({ url: `/pages/${dir}/index` });
  };
  render() {
    return (
      // <MiniUI.Transition show name="fade">
      <View className="wrap">
        <View className="item" onClick={() => this.navigator("appbar")}>
          Appbar
        </View>

        <View className="item" onClick={() => this.navigator("authorize")}>
          Authorize
        </View>

        <View className="item" onClick={() => this.navigator("carousel")}>
          Carousel
        </View>

        <View className="item" onClick={() => this.navigator("divider")}>
          Divider
        </View>

        <View className="item" onClick={() => this.navigator("empty")}>
          Empty
        </View>

        <View className="item" onClick={() => this.navigator("icon")}>
          Icon
        </View>

        <View className="item" onClick={() => this.navigator("image")}>
          Image
        </View>

        <View className="item" onClick={() => this.navigator("loading")}>
          Loading
        </View>
      </View>
      // </MiniUI.Transition>
    );
  }
}
