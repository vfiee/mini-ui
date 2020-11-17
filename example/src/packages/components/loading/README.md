# Loading 加载状态组件

## 参数

支持微信小程序 View 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------ | :----------------------- | :--- | :--- | :----- |
|`color`|否| 组件颜色 |`string`|`#999`|
|`size`|否|组件大小|`string`|`40rpx`|
|`type`|否| `loading`类型 |`circular | spinner`|`circular`|
|`vertical`|否|是否垂直排列|`boolean`|`false`|
|`block`|否|是否渲染为块级元素|`boolean`|`false`|
|`textProps`|否|子元素样式,如果子元素类型不为 React 组件 有效|`ViewProps`|-|
|`children`|否|自定义子元素|`React.ReactNode`|-|

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/loading.css";
```
