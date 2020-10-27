import React, { Component } from "react";
import { showActionSheet } from "@tarojs/taro";
import { Block, View, PickerView, PickerViewColumn } from "@tarojs/components";
import { Carousel, Loading } from "@vyron/mini-ui";
// import ImageOne from "images/carousel/c-1.jpg";
// import ImageTwo from "images/carousel/c-2.jpg";
// import ImageThree from "images/carousel/c-3.jpg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IndicatorType, IndicatorPosition } from "@vyron/mini-ui/types";
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

const showActionSheets = (itemList, key, instance) => {
  showActionSheet({
    itemList,
  }).then((res) => {
    if (itemList[res.tapIndex] !== instance.state[key]) {
      instance.setState({ [key]: itemList[res.tapIndex] });
    }
  });
};

export default class CarouselExample extends Component {
  state = {
    circular: false,
    showMenu: false,
    preview: true,
    customIndicator: true,
    indicatorType: INDICATOR_TYPES[0],
    indicatorPosition: INDICATOR_POSITION[0],
  };
  render() {
    console.log(Carousel);

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
            errorIcon: "icon-error_img",
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
              console.log(`params:`, params);

              return <View className="item-extra">{params.current}</View>;
            },
          }}
          extra={<View className="global-extra">global extra</View>}
        />
        <View
          className="item"
          onClick={showActionSheets.bind(
            null,
            INDICATOR_TYPES,
            "indicatorType",
            this
          )}
        >
          请选择indicatorType:{indicatorType}
        </View>
        <PickerView
          className="picker"
          onChange={(eve) => {
            const { value } = eve.detail;
            this.setState({ indicatorPosition: INDICATOR_POSITION[value[0]] });
          }}
        >
          <PickerViewColumn>
            {INDICATOR_POSITION.map((pos) => {
              return (
                <View key={pos} className="column">
                  {pos}
                </View>
              );
            })}
          </PickerViewColumn>
        </PickerView>
        <View
          className="item"
          onClick={() => {
            this.setState({ customIndicator: !customIndicator });
          }}
        >
          是否自定义indicator:{String(customIndicator)}
        </View>
        <View
          className="item"
          onClick={() => {
            this.setState({ circular: !circular });
          }}
        >
          是否循环:{String(circular)}
        </View>
        <View
          className="item"
          onClick={() => {
            this.setState({ showMenu: !showMenu });
          }}
        >
          预览长按展示菜单:{String(showMenu)}
        </View>
      </Block>
    );
  }
}
