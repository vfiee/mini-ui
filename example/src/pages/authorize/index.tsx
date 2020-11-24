import React, { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Authorize } from "mini-ui";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthScope, OpenType } from "mini-ui/types/authorize.d.ts";
import "./index.less";

const SCOPE_LIST: AuthScope[] = [
  "werun",
  "record",
  "camera",
  "userLocation",
  "writePhotosAlbum",
  "userLocationBackground",
];

const OPEN_TYPE: OpenType[] = [
  "contact",
  "getPhoneNumber",
  "getUserInfo",
  "launchApp",
];

export default class AuthorizeExample extends Component {
  state = {
    scope: SCOPE_LIST[0],
    openType: OPEN_TYPE[0],
  };
  showAction = (itemList, key = "scope") => {
    Taro.showActionSheet({
      itemList,
    })
      .then((res) => {
        const scope = itemList[res.tapIndex];
        scope !== this.state[key] && this.setState({ [key]: scope });
      })
      .catch((err) => {
        console.log(`error:`, err);
      });
  };
  render() {
    console.log(Authorize);

    const { scope, openType } = this.state;
    return (
      <View>
        {/* <Button>12312</Button> */}
        <View className="item" onClick={() => this.showAction(SCOPE_LIST)}>
          选择Scope授权类型
        </View>
        <Authorize
          authorize={false}
          openType="scope"
          authScope={scope}
          onAuthorize={console.log}
          className="button"
        >
          授权({scope})
        </Authorize>

        <View
          className="item"
          onClick={() => this.showAction(OPEN_TYPE, "openType")}
        >
          选择OpenType授权类型
        </View>
        <Authorize
          authorize={false}
          openType={openType}
          onAuthorize={console.log}
          className="button"
        >
          授权({openType})
        </Authorize>
      </View>
    );
  }
}
