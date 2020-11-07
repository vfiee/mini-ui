# 栅格布局系统: 基于 Row(行)和 Col(列)构造的栅格化布局

1.栅格系统分为 1-24 的值来表示占据的空间,Row 占据全部空间,Col 可以通过 span 属性设置占据空间大小,如: `<Col span={6}>`  
2.Row 表示行,Row 中只能使用 Col,水平排列 Col,Row 中 Col 占据空间总和大于 24 时,多余的 Col 会另起一行排列  
3.Col 表示列,可以将内容展示在 Col 内;

## Row

支持微信小程序 View 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------------ | :--- | :-------------------------------------------------- | :---------------- | :------ |
| `justify` | 否 | 水平排列方式 | `normal | start | center | end | stretch | space-between | space-around | space-evenly` | `normal` |
| `align` | 否 | 垂直排列方式 | `normal | stretch | start | end | center` | `normal` |
| `gutter` | 否 | 栅格间隔,支持横向和纵向,使用数组形式可同时设置横向和纵向 `[水平间隔,垂直间隔]`,否则设置横向 | `number | [number,number]` | `[0,0]` |
| `gutterUsePx` | 否 | 是否使用 px 作为间隔单位,默认 rpx | `boolean` | `false` |
| `children` | 否 | Row 子元素,请使用 Col 作为 Row 的子元素,否则将会被忽略 | `Col`组件 | - |

## Col

支持微信小程序 View 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :------------------ | :--- | :-------------------------------------------------- | :---------------- | :------ |
| `span` | 否 | 栅格占据空间,范围:0-24,为 0 时不显示,等同于`display:'none';` | `number` | `0` |
| `offset` | 否 | 栅格左侧偏移空间,范围:0-24,为 0 时不偏移 | `number` | `0` |
| `pull` | 否 | 栅格向左移动空间,范围:0-24,为 0 时不移动 | `number` | `0` |
| `push` | 否 | 栅格向右移动空间,范围:0-24,为 0 时不移动 | `number` | `0` |
| `order` | 否 | 栅格排列顺序 | `number` |-|
|`children`| 否 | 子元素 |`React.ReactNode` | - |
