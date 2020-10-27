import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Icon } from "@vyron/mini-ui";
import "./index.less";

export default class IconExample extends Component {
  render() {
    console.log(Icon);

    return (
      <View className="icon">
        <Icon type="icon-empty" />
      </View>
    );
  }
}
