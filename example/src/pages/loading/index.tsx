import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Loading } from "@vyron/mini-ui";
import "./index.less";

export default class LoadingExample extends Component {
  render() {
    console.log(Loading);
    return (
      <View className="loading">
        <Loading type="spinner" />
      </View>
    );
  }
}
