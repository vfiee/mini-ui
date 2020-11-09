# mini-ui

基于 Taro V3 版本打造的微信小程序 UI 库

## 安装

```bash
# yarn
yarn add @vyron/mini-ui

# npm
npm install @vyron/mini-ui

```

## 使用

### 样式

```less
// app.less 全局样式
@import "../node_modules/@vyron/mini-ui/style/index.css";
```

### 组件

```tsx
import React from "react;
import { Appbar } from "@vyron/mini-ui";
import backIcon from "@Images/appbar/back-white-icon.png";
import homeWhiteIcon from "@Images/appbar/home-white-icon.png";
// 局部样式 tsx文件引入
import "../node_modules/@vyron/mini-ui/style/appbar.css";
import "./index.less"

class Home extends React.Component {
    render(){
        return (
        <AppBar
            type="white"
            title="首页"
            left={{
                isCover: true,
                localImage: true,
                style: {
                width: "18rpx",
                height: "30rpx",
                },
                type: backIcon,
            }}
            right={{
                isCover: true,
                localImage: true,
                style: {
                width: "34rpx",
                height: "34rpx",
                },
                type: homeWhiteIcon,
            }}
            onTitleClick={console.log}
            onLeftClick={console.log}
            onRightClick={console.log}
            backgroundColor="#00ab84"
        />
        )
    }
}
```

```less
// 按需引入文件  index.less
@import "../node_modules/@vyron/mini-ui/style/appbar.css";
```

## 计划

|    组件    |       说明       | 状态 |
| :--------: | :--------------: | :--: |
|   AppBar   | 自定义顶部导航栏 |  ✅  |
| Authorize  |     获取授权     |  ✅  |
|  Carousel  |      轮播图      |  ✅  |
|  Divider   |      分隔符      |  ✅  |
|   Empty    |       空白       |  ✅  |
|    Icon    |     iconfont     |  ✅  |
|   Image    |       图片       |  ✅  |
|  Loading   |       加载       |  ✅  |
|    Grid    |     栅格布局     |  ✅  |
|  Overlay   |       遮罩       |  ✅  |
| Transition |     过渡动画     |  ✅  |
|    Cell    |      单元格      | ⬜️  |
|   Field    |      输入框      |  ⬜  |
|    Form    |    Form 表单     | ⬜️  |
|    List    |       列表       | ⬜️  |
|   Button   |       按钮       | ⬜️  |
|  Message   |       提示       | ⬜️  |
|   Modal    |      对话框      | ⬜️  |

## 预览

扫描二维码预览

<img width="300" height="300" src="./preview.png" alt="扫码预览" />

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT許可證) 协议
