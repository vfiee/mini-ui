import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Image, Loading, Icon } from "mini-ui";
import demoImage from "@Images/image/i-1.jpg";
import "./index.less";

/** 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 */
/** 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 */
/** 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变 */
/** 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变 */
/** 裁剪模式，不缩放图片，只显示图片的顶部区域 */
/** 裁剪模式，不缩放图片，只显示图片的底部区域 */
/** 裁剪模式，不缩放图片，只显示图片的中间区域 */
/** 裁剪模式，不缩放图片，只显示图片的左边区域 */
/** 裁剪模式，不缩放图片，只显示图片的右边区域 */
/** 裁剪模式，不缩放图片，只显示图片的左上边区域 */
/** 裁剪模式，不缩放图片，只显示图片的右上边区域 */
/** 裁剪模式，不缩放图片，只显示图片的左下边区域 */
/** 裁剪模式，不缩放图片，只显示图片的右下边区域 */
const IMAGE_MODES = [
  "scaleToFill",
  "aspectFit",
  "aspectFill",
  "widthFix",
  "heightFix",
  "top",
  "bottom",
  "center",
  "left",
  "right",
  "top left",
  "top right",
  "bottom left",
  "bottom right",
];

const NETWORK_IMAGE_URL =
  "https://desk-fd.zol-img.com.cn/t_s2560x1600c5/g5/M00/0C/05/ChMkJ14dLNeIfJBuAAZKuwc_TagAAwWUAJPWVAABkrT442.jpg";

export default class ImageExample extends Component {
  render() {
    return (
      <View className="box">
        {/* 圆角 */}
        <View className="title">圆角</View>
        <View className="wrap">
          <View className="item">
            <Image width="150rpx" height="150rpx" round src={demoImage} />
            <View>圆角</View>
          </View>
          <View className="item">
            <Image
              width="266rpx"
              height="150rpx"
              radius="10rpx"
              src={demoImage}
            />
            <View>自定义圆角</View>
          </View>
        </View>
        {/* 加载中提示 */}
        <View className="title">加载中提示</View>
        <View className="wrap">
          <View className="item">
            <Image
              showLoading
              width="300rpx"
              height="188rpx"
              delay={2000}
              src={NETWORK_IMAGE_URL}
            />
            <View>默认加载中样式</View>
          </View>
          <View className="item">
            <Image
              showLoading
              loading={<Loading color="#00ab84" type="spinner" />}
              width="300rpx"
              height="188rpx"
              delay={3000}
              src={NETWORK_IMAGE_URL}
            />
            <View>自定义加载中样式</View>
          </View>
        </View>
        {/* 图片加载错误 */}
        <View className="title">图片加载错误</View>
        <View className="wrap">
          <View className="item">
            <Image
              showError
              showLoading
              width="300rpx"
              height="188rpx"
              delay={2000}
              src={`${NETWORK_IMAGE_URL}s`}
            />
            <View>默认加载错误</View>
          </View>
          <View className="item">
            <Image
              showError
              showLoading
              error={
                <View className="img-error">
                  <Icon type="icon-500" size="60rpx" />
                  <View>网络错误</View>
                </View>
              }
              width="300rpx"
              height="188rpx"
              delay={3000}
              src={`${NETWORK_IMAGE_URL}s`}
            />
            <View>自定义加载错误</View>
          </View>
        </View>
        {/* 图片模式 */}
        <View className="title">图片模式</View>
        <View className="wrap">
          <View className="item">
            <Image
              showError
              showLoading
              width="266rpx"
              height="150rpx"
              src={demoImage}
            />
            <View>原图</View>
          </View>
          {IMAGE_MODES.map((mode) => {
            return (
              <View className="item" key={mode}>
                <Image
                  showError
                  showLoading
                  mode={mode as any}
                  width="266rpx"
                  height="150rpx"
                  src={demoImage}
                />
                <View>{mode}</View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
