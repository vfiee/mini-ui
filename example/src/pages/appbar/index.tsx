import React, { useState } from "react";
import Taro from "@tarojs/taro";
import _ from "lodash";
import { View, Block, CoverImage, Switch, Text } from "@tarojs/components";
import { AppBar } from "mini-ui";
import { useMenuButton } from "mini-ui/hooks";
import backWhiteIcon from "@Images/appbar/back-white-icon.png";
import backBlackIcon from "@Images/appbar/back-black-icon.png";
import homeWhiteIcon from "@Images/appbar/home-white-icon.png";
import homeBlackIcon from "@Images/appbar/home-black-icon.png";
import logo from "@Images/logo.png";
import "./index.less";

const APPBAR_KEYS = ["ALL", "BACK", "HOME", "SEARCH"];

export default function AppBarExample() {
  const [state, setState] = useState({
    appbarKey: APPBAR_KEYS[0],
    theme: "black"
  });
  const navigateBack = () => Taro.navigateBack();
  const navigateHome = () => Taro.redirectTo({ url: `/pages/index/index` });
  const onTitleClick = () => Taro.showModal({ title: "点击了标题" });
  const setAppbarKey = key => {
    key !== state.appbarKey && setState({ ...state, appbarKey: key });
  };
  const {
    menuStyle: { width, height, borderRadius }
  } = useMenuButton();
  const { appbarKey } = state;
  const getImage = type => {
    return _.get(
      {
        back: {
          white: backWhiteIcon,
          black: backBlackIcon
        },
        home: {
          white: homeWhiteIcon,
          black: homeBlackIcon
        }
      },
      `${type}.${state.theme}`
    );
  };
  const getBackgroundColor = () => {
    return state.theme === "white" ? "#00ab84" : "#ff6767";
  };
  return (
    <Block>
      {appbarKey === "ALL" && (
        <AppBar
          isCoverView
          type={state.theme}
          title="全部"
          left={{
            isCover: true,
            localImage: true,
            style: {
              width: "18rpx",
              height: "30rpx"
            },
            type: getImage("back")
          }}
          right={{
            isCover: true,
            localImage: true,
            style: {
              width: "34rpx",
              height: "34rpx"
            },
            type: getImage("home")
          }}
          onTitleClick={onTitleClick}
          onLeftClick={navigateBack}
          onRightClick={navigateHome}
          backgroundColor={getBackgroundColor()}
        />
      )}
      {appbarKey === "BACK" && (
        <AppBar
          type={state.theme}
          title="返回"
          left={{
            // isCover: true,
            localImage: true,
            style: {
              width: "10px",
              height: "18px"
            },
            type: getImage("back")
          }}
          onTitleClick={onTitleClick}
          onLeftClick={navigateBack}
          backgroundColor={getBackgroundColor()}
        />
      )}
      {appbarKey === "HOME" && (
        <AppBar
          type={state.theme}
          title="首页"
          left={{
            // isCover: true,
            localImage: true,
            style: {
              width: "34rpx",
              height: "34rpx"
            },
            type: getImage("home")
          }}
          onTitleClick={onTitleClick}
          onLeftClick={navigateHome}
          backgroundColor={getBackgroundColor()}
        />
      )}
      {appbarKey === "SEARCH" && (
        <AppBar
          type={state.theme}
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
          backgroundColor={getBackgroundColor()}
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
        <View className="theme">
          <Text className="label">
            主题: {state.theme === "white" ? "白色" : "黑色"}
          </Text>
          <Switch
            type="switch"
            onChange={eve => {
              const { value } = eve.detail;
              setState({
                ...state,
                theme: value ? "white" : "black"
              });
            }}
          />
        </View>
      </View>
    </Block>
  );
}
