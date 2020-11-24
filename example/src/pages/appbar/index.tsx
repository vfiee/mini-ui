import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Block } from "@tarojs/components";
import { AppBar } from "mini-ui";
import backIcon from "@Images/appbar/back-white-icon.png";
import homeWhiteIcon from "@Images/appbar/home-white-icon.png";
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
    console.log("appbarKey:", this.state.appbarKey);

    const { appbarKey } = this.state;
    return (
      <Block>
        {appbarKey === "ALL" && (
          <AppBar
            isCoverView
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
              // isCover: true,
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
              // isCover: true,
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
        {/* <CoverView style={{ backgroundColor: "#f2f2f2" }}>
          <CoverImage
            style={{
              width: "18rpx",
              height: "30rpx",
            }}
            src={backIcon}
          />
        </CoverView> */}
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
      </Block>
    );
  }
}
