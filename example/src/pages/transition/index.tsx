import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";

export default class Transition extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="transition">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
