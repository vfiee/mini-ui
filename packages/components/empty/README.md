# Empty

空状态

## 参数

支持微信小程序 View 组件的其余参数[文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------ | :----------------------- | :--- | :--- | :----- |
|`image`|否|内置空状态类型(`empty | network | error`)或`IconProps`(详见 `Icon` 组件)|`EmptyType | IconProps`|`empty`|
|`description`|否|空状态描述|`string`|-|
|`children`|否|分隔符自定义元素|`React.ReactNode`|-|

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/icon.css";
@import "~/@vyron/mini-ui/style/empty.css";
```
