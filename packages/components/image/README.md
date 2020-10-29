# Image

图片组件,支持小程序的全部属性,支持 loading 显示加载组件,error 显示错误组件

## 参数

支持微信小程序 Image 组件的其余参数[文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------ | :----------------------- | :--- | :--- | :----- |
|`showLoading`|否| 是否展示图片加载中 |`boolean`|`false`|
|`loading`|否|自定义`loading`样式,如果接受到字符串,被认为是 icon,否则被认为是自定义组件(showLoading 时有效)|`string | React.ReactElement`|`icon-default-img`|
|`showError`|否| 是否展示图片错误样式 |`boolean`|`false`|
|`error`|否|自定义`error`样式,如果接受到字符串,被认为是 icon,否则被认为是自定义组件(showError 时有效)|`string | React.ReactElement`|`icon-error-img`|
|`round`|否|是否圆角展示|`boolean`|`false`|
|`radius`|否|自定义圆角样式,如:`20rpx`|`string`|-|
|`width`|否|图片宽度,如:`160px`|`string`|-|
|`height`|否|图片高度,如:`160rpx`|`string`|-|
|`children`|否|自定义子元素|`React.ReactNode`|-|

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/icon.css";
@import "~/@vyron/mini-ui/style/image.css";
```
