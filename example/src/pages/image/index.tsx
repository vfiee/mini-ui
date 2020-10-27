import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Image } from "@vyron/mini-ui";
import "./index.less";

export default class ImageExample extends Component {
  render() {
    console.log(Image);

    return (
      <View className="image">
        <Image src="" />
      </View>
    );
  }
}
