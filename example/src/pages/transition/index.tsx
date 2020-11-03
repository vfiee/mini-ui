import React, { Component } from "react";
import { View } from "@tarojs/components";
import { Transition } from "@vyron/mini-ui";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionType } from "@vyron/mini-ui/types";
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
      <View className="transition">
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
        <Transition
          {...this.state.props}
          beforeEnter={this.beforeEnter}
          onEnter={this.onEnter}
          afterEnter={this.afterEnter}
          beforeLeave={this.beforeLeave}
          onLeave={this.onLeave}
          afterLeave={this.afterLeave}
        >
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
            {this.state.props.name}
          </View>
        </Transition>
      </View>
    );
  }
}
