import React, { Component } from "react";
import { Block, View, Switch, Input } from "@tarojs/components";
import { Overlay } from "mini-ui";
import "./index.less";

const CONFIG_ROWS = [
  {
    key: `show`,
    label: `是否展示`,
    type: "switch",
  },
  {
    key: `customAppbar`,
    label: `是否自定义导航栏`,
    type: "switch",
  },
  {
    key: `preventScroll`,
    label: `是否阻止滚动`,
    type: "switch",
  },
  {
    key: `opacity`,
    label: `透明度`,
    type: "number",
  },
  {
    key: `zIndex`,
    label: `Css样式层级`,
    type: "number",
  },
  {
    key: `duration`,
    label: `动画持续时长,单位(秒)`,
    type: "number",
  },
  {
    key: `showChildren`,
    label: `是否展示子元素`,
    type: "switch",
    isProps: false,
  },
];

export default class OverlayExample extends Component {
  state = {
    props: {
      show: false,
      customAppbar: false,
      preventScroll: true,
      opacity: 0.6,
      zIndex: 1,
      duration: 0.3,
    },
    showChildren: true,
  };
  closeOverlay = () => {
    this.setState({
      props: {
        ...this.state.props,
        show: false,
      },
    });
  };
  getContent({ key, type, isProps = true }) {
    switch (type) {
      case "switch": {
        const isChecked = isProps ? this.state.props[key] : this.state[key];
        return (
          <Switch
            checked={isChecked}
            onChange={(eve) => {
              console.log(`switch:`, eve);
              if (!isProps) {
                this.setState({ [key]: eve.detail.value });
                return;
              }
              this.setState({
                props: {
                  ...this.state.props,
                  [key]: eve.detail.value,
                },
              });
            }}
          />
        );
      }
      case "number": {
        return (
          <Input
            type="number"
            className="input"
            value={this.state.props[key]}
            onInput={(eve) => {
              console.log(`input:`, eve);
              this.setState({
                props: {
                  ...this.state.props,
                  [key]: eve.detail.value,
                },
              });
            }}
          />
        );
      }
      default:
        return null;
    }
  }
  render() {
    return (
      <Block>
        <Overlay
          {...this.state.props}
          className="overlay"
          onClick={this.closeOverlay}
        >
          {this.state.showChildren && (
            <View
              className="overlay-child"
              onClick={(eve) => {
                eve.stopPropagation();
                console.log(`overlay-child:`, eve);
              }}
            >
              Child
            </View>
          )}
        </Overlay>
        {CONFIG_ROWS.map((row) => {
          const { key, label } = row;
          return (
            <View className="row" key={key}>
              <View className="label">{label}:</View>
              <View className="content">{this.getContent(row)}</View>
            </View>
          );
        })}
      </Block>
    );
  }
}
