import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Block, CoverImage } from "@tarojs/components";
import { AppBar } from "mini-ui";
import { useMenuButton } from "mini-ui/hooks";
import backIcon from "@Images/appbar/back-white-icon.png";
import homeWhiteIcon from "@Images/appbar/home-white-icon.png";
import logo from "@Images/logo.png";
import "./index.less";

const APPBAR_KEYS = ["ALL", "BACK", "HOME", "SEARCH"];

export default function AppBarExample() {
  const [state, setState] = useState({
    appbarKey: APPBAR_KEYS[3]
  });
  const navigateBack = () => Taro.navigateBack();
  const setAppbarKey = key => {
    key !== state.appbarKey && setState({ appbarKey: key });
  };
  const {
    menuStyle: { width, height, borderRadius }
  } = useMenuButton();
  const { appbarKey } = state;
  return (
    <Block>
      {appbarKey === "ALL" && (
        <AppBar
          isCoverView
          type="white"
          title="全部"
          left={{
            isCover: true,
            localImage: true,
            style: {
              width: "18rpx",
              height: "30rpx"
            },
            type: backIcon
          }}
          right={{
            isCover: true,
            localImage: true,
            style: {
              width: "34rpx",
              height: "34rpx"
            },
            type: homeWhiteIcon
          }}
          onTitleClick={console.log}
          onLeftClick={navigateBack}
          onRightClick={console.log}
          backgroundColor="#00ab84"
        />
      )}
      {appbarKey === "BACK" && (
        <AppBar
          type="white"
          title="返回"
          left={{
            // isCover: true,
            localImage: true,
            style: {
              width: "10px",
              height: "18px"
            },
            type: backIcon
          }}
          onTitleClick={console.log}
          onLeftClick={navigateBack}
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
              height: "34rpx"
            },
            type: homeWhiteIcon
          }}
          onTitleClick={console.log}
          onLeftClick={console.log}
          backgroundColor="#00ab84"
        />
      )}
      {appbarKey === "SEARCH" && (
        <AppBar
          type="white"
          title={<View className="search">搜索</View>}
          left={
            <CoverImage
              src={logo}
              className="logo"
              style={{ width, height, borderRadius }}
            />
          }
          onTitleClick={console.log}
          onLeftClick={console.log}
          backgroundColor="#00ab84"
        />
      )}
      <View className="wrap">
        {APPBAR_KEYS.map(key => (
          <View
            key={key}
            onClick={() => setAppbarKey(key)}
            className={`item ${key === appbarKey ? "active" : ""}`}
          >
            {key}
          </View>
        ))}
      </View>
    </Block>
  );
}
