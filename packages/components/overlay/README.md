# Overlay 遮罩层

## 参数

支持微信小程序 View 组件的其余参数[文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------ | :----------------------- | :--- | :--- | :----- |
|`show`|否| 是否展示 |`boolean`|`false`|
|`customAppbar`|否|使用使用 mini-ui 的 AppBar 组件 自定义导航栏|`boolean`|`false`|
|`preventScroll`|否| 是否阻止底部滚动 |`boolean`|`true`|
|`opacity`|否|遮罩透明度|`number | string`|`0.6`|
|`zIndex`|否|遮罩 CSS 层级|`number | string`|`1`|
|`duration`|否|动画持续时长,单位秒(s)|`number | string`|`0.3`|
|`children`|否|自定义子元素|`React.ReactNode`|-|

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/transition.css";
@import "~/@vyron/mini-ui/style/overlay.css";
```
