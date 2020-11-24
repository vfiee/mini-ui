import React, { Component } from "react";
import { Block, View } from "@tarojs/components";
import { Transition, Overlay } from "mini-ui";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionType } from "mini-ui/types";
import "./index.less";

const TRANSITION_TYPES: TransitionType[] = [
  "fade",
  "fadeUp",
  "fadeDown",
  "fadeLeft",
  "fadeRight",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
];

export default class TransitionExample extends Component {
  state = {
    props: {
      show: false,
      duration: 300,
      name: TRANSITION_TYPES[0],
    },
  };
  beforeEnter() {
    console.log(`beforeEnter`);
  }
  onEnter() {
    console.log(`onEnter`);
  }
  afterEnter() {
    console.log(`afterEnter`);
  }
  beforeLeave() {
    console.log(`beforeLeave`);
  }
  onLeave() {
    console.log(`onLeave`);
  }
  afterLeave() {
    console.log(`afterLeave`);
  }
  render() {
    return (
      <Block>
        <Transition
          {...this.state.props}
          className="transition-wrap"
          beforeEnter={this.beforeEnter}
          onEnter={this.onEnter}
          afterEnter={this.afterEnter}
          beforeLeave={this.beforeLeave}
          onLeave={this.onLeave}
          afterLeave={this.afterLeave}
        >
          {/* <Overlay show={this.state.props.show} withoutTransition> */}
          <View
            className="transition-child"
            onClick={(eve) => {
              eve.stopPropagation();
              this.setState({
                props: {
                  ...this.state.props,
                  show: false,
                },
              });
            }}
          >
            <View>Mini-ui: {this.state.props.name}</View>
            <View className="info">点我关闭</View>
          </View>
          {/* </Overlay> */}
        </Transition>
        <Overlay show={this.state.props.show} />
        {TRANSITION_TYPES.map((type) => (
          <View
            key={type}
            className="transition-item"
            onClick={() => {
              this.setState({
                props: {
                  ...this.state.props,
                  name: type,
                  show: true,
                },
              });
            }}
          >
            {type}
          </View>
        ))}
      </Block>
    );
  }
}
