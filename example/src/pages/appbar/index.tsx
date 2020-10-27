import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AppBar } from "@vyron/mini-ui";
import backIcon from "images/appbar/back-white-icon.png";
import homeWhiteIcon from "images/appbar/home-white-icon.png";
import "./index.less";

const APPBAR_KEYS = ["ALL", "BACK", "HOME"];
export default class AppBarExample extends Component {
  state = {
    appbarKey: APPBAR_KEYS[0],
  };
  navigateBack = () => Taro.navigateBack();
  setAppbarKey = (key) => {
    key !== this.state.appbarKey && this.setState({ appbarKey: key });
  };
  render() {
    console.log("appbar:", AppBar);
    console.log("appbarKey:", this.state.appbarKey);

    const { appbarKey } = this.state;
    return (
      <View className="index">
        {appbarKey === "ALL" && (
          <AppBar
            type="white"
            title="首页"
            left={{
              isCover: true,
              localImage: true,
              style: {
                width: "18rpx",
                height: "30rpx",
              },
              type: backIcon,
            }}
            right={{
              isCover: true,
              localImage: true,
              style: {
                width: "34rpx",
                height: "34rpx",
              },
              type: homeWhiteIcon,
            }}
            onTitleClick={console.log}
            onLeftClick={this.navigateBack}
            onRightClick={console.log}
            backgroundColor="#00ab84"
          />
        )}
        {appbarKey === "BACK" && (
          <AppBar
            type="white"
            title="首页"
            left={{
              isCover: true,
              localImage: true,
              style: {
                width: "10px",
                height: "18px",
                marginLeft: "10px",
              },
              type: backIcon,
            }}
            onTitleClick={console.log}
            onLeftClick={this.navigateBack}
            backgroundColor="#00ab84"
          />
        )}
        {appbarKey === "HOME" && (
          <AppBar
            type="white"
            title="首页"
            left={{
              isCover: true,
              localImage: true,
              style: {
                width: "34rpx",
                height: "34rpx",
                marginLeft: "20rpx",
              },
              type: homeWhiteIcon,
            }}
            onTitleClick={console.log}
            onLeftClick={console.log}
            backgroundColor="#00ab84"
          />
        )}
        <View className="wrap">
          {APPBAR_KEYS.map((key) => (
            <View
              key={key}
              className={`item ${key === appbarKey ? "active" : ""}`}
              onClick={() => this.setAppbarKey(key)}
            >
              {key}
            </View>
          ))}
        </View>
      </View>
    );
  }
}
