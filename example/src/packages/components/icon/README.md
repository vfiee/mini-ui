# Icon

## 参数

支持微信小程序 View 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------ | :----------------------- | :--- | :--- | :----- |
|`isCover`|否| 设置为`true`,容器元素为`CoverView`,图片元素为`CoverImage` |`boolean`|-|
|`type`|true|`icon`类型|`string`|-|
|`size`|否|`icon`大小(携带单位,如`20px`)|`string`|`32rpx`|
|`color`|否|`icon`颜色|`string`|-|
|`fontFamily`|否|自定义`iconfont`字体|`string`|`iconfont`|
|`localImage`|否|是否渲染为图片,当 `type` 以 `http` 或 `https` 开头时,且包含`.jpg|.jpeg|.png|.gif|.svg`时被认为为网络图片,会将 icon 渲染为图片|`boolean`|`false`|
|`children`|否|自定义子元素|`React.ReactNode`|-|

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/icon.css";
```
