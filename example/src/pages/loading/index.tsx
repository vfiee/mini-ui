import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Loading } from "mini-ui";
import "./index.less";

const LOADING_PROPS = [
  {
    title: "默认类型",
    props: [
      {
        type: "circular",
      },
      {
        type: "spinner",
      },
    ],
  },
  {
    title: "自定义大小",
    props: [
      {
        type: "circular",
        size: "60rpx",
      },
      {
        type: "spinner",
        size: "60rpx",
      },
    ],
  },
  {
    title: "自定义颜色",
    props: [
      {
        type: "circular",
        color: "#00ab84",
        children: "加载中...",
        textProps: {
          style: {
            color: "#00ab84",
          },
        },
      },
      {
        type: "spinner",
        color: "#00ab84",
        children: "加载中...",
        textProps: {
          style: {
            color: "#00ab84",
          },
        },
      },
    ],
  },
  {
    title: "垂直排列",
    props: [
      {
        type: "circular",
        vertical: true,
        children: "加载中...",
      },
      {
        type: "spinner",
        vertical: true,
        children: "加载中...",
      },
    ],
  },
  {
    title: "块级展示",
    props: [
      {
        type: "circular",
        vertical: true,
        children: "加载中...",
        block: true,
      },
      {
        type: "spinner",
        vertical: true,
        children: "加载中...",
        block: true,
      },
    ],
  },
];

export default class LoadingExample extends Component {
  render() {
    return (
      <View className="loading">
        {LOADING_PROPS.map((item) => {
          const { title, props } = item;
          return (
            <View className="item" key={title}>
              <View className="title">{title}</View>
              {/* @ts-ignore */}
              {props.map((prop) => (
                <Loading
                  className="loading-item"
                  key={prop.type}
                  {...prop}
                ></Loading>
              ))}
            </View>
          );
        })}
      </View>
    );
  }
}
