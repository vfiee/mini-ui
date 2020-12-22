# Cell 单元格

## CellGroup 参数

支持微信小程序 View 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html) | 参数 | 必填 | 说明 | 类型 | 默认值 | | :------------ | :----------------------- | :--- | :--- | :----- | |`title`|否|标题|`React.ReactNode`|-| |`titleClass`|否|标题类名|`string`|-| |`titleStyle`|否|标题样式|`React.CSSProperties | string`|-| |`border`|否|显示边框|`React.ReactNode`|`true`| |`children`|否|自定义子元素|`React.ReactNode`|-|

## Cell 参数

支持微信小程序 View 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html) | 参数 | 必填 | 说明 | 类型 | 默认值 | | :------------ | :----------------------- | :--- | :--- | :----- | |`title`|否|标题|`React.ReactNode`|-| |`colon`|否|分隔符,`boolean` 类型时显示`:` `string` 直接显示|`boolean | string`|`false`| |`titleClass`|否|标题类名|`string`|-| |`titleStyle`|否|标题样式|`React.CSSProperties | string`|-| |`value`|否|内容|`React.ReactNode`|-| |`valueClass`|否|内容类名|`string`|-| |`valueStyle`|否|内容样式|`React.CSSProperties | string`|-| |`label`|否|描述信息|`React.ReactNode`|-| |`labelClass`|否|描述信息类名|`string`|-| |`labelStyle`|否|描述信息样式|`React.CSSProperties | string`|-| |`icon`|否|左侧 icon|`React.ReactNode | IconProps`|-| |`rightIcon`|否|右侧 icon|`React.ReactNode | IconProps`|-| |`url`|否|小程序跳转页面|`string`|-| |`replace`|否|跳转时,是否替换当前页面|`boolean`|`false`| |`center`|否|垂直居中显示内容|`boolean`|`false`| |`arrow`|否|是否显示箭头|`boolean`|`false`| |`arrowDirection`|否|箭头方向|`left | right | up | down`|`right`| |`border`|否|显示边框|`React.ReactNode`|`true`| |`children`|否|自定义子元素|`React.ReactNode`|-|

## 按需加载样式

```less
@import ~/ @vyron / mini-ui/style/icon.css;
@import ~/ @vyron / mini-ui/style/cell.css;
```
