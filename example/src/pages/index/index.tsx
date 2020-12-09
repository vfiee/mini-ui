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

        <View className="item" onClick={() => this.navigator("authorize")}>
          Authorize
        </View>

        <View className="item" onClick={() => this.navigator("carousel")}>
          Carousel
        </View>

        <View className="item" onClick={() => this.navigator("cell")}>
          Cell
        </View>

        <View className="item" onClick={() => this.navigator("divider")}>
          Divider
        </View>

        <View className="item" onClick={() => this.navigator("empty")}>
          Empty
        </View>

        <View className="item" onClick={() => this.navigator("field")}>
          Field
        </View>

        <View className="item" onClick={() => this.navigator("grid")}>
          Grid
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

        <View className="item" onClick={() => this.navigator("overlay")}>
          Overlay
        </View>

        <View className="item" onClick={() => this.navigator("transition")}>
          Transition
        </View>
      </View>
    );
  }
}
