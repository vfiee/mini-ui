import React, { Component } from "react";
import { Block, View, Switch, Picker } from "@tarojs/components";
import { Carousel, Loading } from "mini-ui";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IndicatorType, IndicatorPosition } from "mini-ui/types";
import "./index.less";

const CAROUSEL_DATA = [
  {
    url:
      "https://publicdomainarchive.com/wp-content/uploads/2017/09/free-stock-photos-public-domain-images-013-1000x667.jpg",
  },
  {
    url:
      "https://publicdomainarchive.com/wp-content/uploads/2017/01/public-domain-images-free-stock-photos008-1000x625.jpg",
  },
  {
    url:
      "https://publicdomainarchive.com/wp-content/uploads/2015/03/public-domain-images-free-stock-photos-bicycle-bike-black-and-white-1000x667.jpeg",
  },
  {
    url: `https://file.zhen22.com/weapp/preview.png`,
  },
];

const INDICATOR_TYPES: IndicatorType[] = ["dots", "numbers"];
const INDICATOR_POSITION: IndicatorPosition[] = [
  "topLeft",
  "topCenter",
  "topRight",
  "leftTop",
  "leftCenter",
  "leftBottom",
  "rightTop",
  "rightCenter",
  "rightBottom",
  "bottomLeft",
  "bottomRight",
  "bottomCenter",
];
const CAROUSEL_OPTIONS = [
  {
    type: "select",
    label: "指示器类型",
    key: "indicatorType",
    options: INDICATOR_TYPES,
  },
  {
    type: "select",
    label: "指示器位置",
    key: "indicatorPosition",
    options: INDICATOR_POSITION,
  },
  {
    key: "customIndicator",
    label: "是否自定义指示器",
    type: "switch",
  },
  {
    key: "circular",
    label: "是否循环",
    type: "switch",
  },
  {
    key: "showMenu",
    label: "长按图片展示菜单",
    type: "switch",
  },
  {
    key: "preview",
    label: "是否预览图片",
    type: "switch",
  },
];

export default class CarouselExample extends Component {
  state = {
    circular: true,
    showMenu: true,
    preview: true,
    customIndicator: false,
    indicatorType: INDICATOR_TYPES[0],
    indicatorPosition: INDICATOR_POSITION[11],
  };
  getContent(option) {
    const { type, key, options } = option;
    switch (type) {
      case "switch": {
        return (
          <Switch
            checked={this.state[key]}
            onChange={(eve) => {
              this.setState({ [key]: eve.detail.value });
            }}
          />
        );
      }
      case "select": {
        return (
          <Picker
            mode="selector"
            range={options}
            value={this.state[key]}
            onChange={(eve) => {
              this.setState({ [key]: options[eve.detail.value] });
            }}
          >
            <View>{this.state[key]}</View>
          </Picker>
        );
      }
      default:
        return null;
    }
  }
  render() {
    const {
      circular,
      showMenu,
      preview,
      customIndicator,
      indicatorType,
      indicatorPosition,
    } = this.state;
    return (
      <Block>
        <Carousel
          srcKey="url"
          className="carousel"
          style={{ backgroundColor: "#f2f2f2" }}
          data={CAROUSEL_DATA}
          showMenu={showMenu}
          preview={preview}
          image={{
            mode: "aspectFill",
            showLoading: true,
            loading: <Loading type="spinner" />,
            showError: true,
            error: "error-img",
          }}
          swiper={{
            circular: circular,
            customIndicator: customIndicator,
            indicatorType: indicatorType,
            indicatorPosition: indicatorPosition,
            indicatorActiveColor: "#00ab84",
            dotActiveLine: true,
          }}
          swiperItem={{
            extra: (params) => {
              return (
                <View className="item-extra">extra: {params.current}</View>
              );
            },
          }}
          extra={<View className="global-extra">global extra</View>}
        />
        {CAROUSEL_OPTIONS.map((option) => {
          const { key, label } = option;
          return (
            <View className="row" key={key}>
              <View className="label">{label}:</View>
              <View className="content">{this.getContent(option)}</View>
            </View>
          );
        })}
      </Block>
    );
  }
}
