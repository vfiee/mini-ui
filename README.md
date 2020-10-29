# mini-ui

Taro V3 小程序 UI 库

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
// less文件引入  index.less
@import "../node_modules/@vyron/mini-ui/style/appbar.css";
```

## 计划

|                    完成                    |    组件    |       说明       |
| :----------------------------------------: | :--------: | :--------------: |
| <input type="checkbox" checked disabled /> |   AppBar   | 自定义顶部导航栏 |
| <input type="checkbox" checked disabled /> | Authorize  |     获取授权     |
| <input type="checkbox" checked disabled /> |  Carousel  |      轮播图      |
| <input type="checkbox" checked disabled /> |  Divider   |      分隔符      |
| <input type="checkbox" checked disabled /> |   Empty    |       空白       |
| <input type="checkbox" checked disabled /> |    Icon    |     iconfont     |
| <input type="checkbox" checked disabled /> |   Image    |       图片       |
|     <input type="checkbox" disabled />     |  Loading   |       加载       |
|     <input type="checkbox" disabled />     |  Overlay   |       遮罩       |
|     <input type="checkbox" disabled />     | Transition |     过渡动画     |
|     <input type="checkbox" disabled />     |    Cell    |      单元格      |
|     <input type="checkbox" disabled />     |   Field    |      输入框      |
|     <input type="checkbox" disabled />     |    Form    |    Form 表单     |
|     <input type="checkbox" disabled />     |    List    |       列表       |
|     <input type="checkbox" disabled />     |  SafeArea  |     安全区域     |
|     <input type="checkbox" disabled />     |   Layout   |       布局       |
|     <input type="checkbox" disabled />     |   Button   |       按钮       |
|     <input type="checkbox" disabled />     |  Message   |       提示       |
|     <input type="checkbox" disabled />     |   Modal    |      对话框      |

## 预览

扫描二维码预览

<img width="300" height="300" src="./preview.png" alt="扫码预览" />

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT許可證) 协议
