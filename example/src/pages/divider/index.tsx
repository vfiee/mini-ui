import React, { Component } from "react";
import { View, Block, Text } from "@tarojs/components";
import { Divider } from "@vyron/mini-ui";
import "./index.less";

export default class DividerExample extends Component {
  render() {
    console.log(Divider);
    return (
      <Block>
        <View className="item">
          <Text className="label">默认分隔符</Text>
          <Divider hairLine={false} />
        </View>
      </Block>
    );
  }
}
