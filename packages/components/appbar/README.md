# AppBar

小程序自定义 AppBar

## 参数

|       参数        | 必填 | 说明                                                     | 类型        | 默认值              |
| :---------------: | :--: | :------------------------------------------------------- | :---------- | :------------------ |
|      `title`      |  否  | 导航栏标题                                               | `string     | React.ReactElement` | - |
| `backgroundColor` |  否  | 导航栏背景色                                             | `string`    | -                   |
|      `type`       |  否  | 导航栏颜色,同微信 navigationBarTextStyle                 | `black      | white`              | `white` |
|      `left`       |  否  | 导航栏左侧 Icon 属性                                     | `IconProps` | -                   |
|     `middle`      |  否  | 导航栏分隔符样式                                         | `ViewProps` | -                   |
|      `right`      |  否  | 导航栏右侧 Icon 属性                                     | `IconProps` | -                   |
|   `onLeftClick`   |  否  | 导航栏左侧点击事件,参数 function({menuStyle,rect},event) | `Function`  | -                   |
|  `onTitleClick`   |  否  | 导航栏标题点击事件                                       | `Function`  | -                   |
|  `onRightClick`   |  否  | 导航栏左侧点击事件,参数 function({menuStyle,rect},event) | `Function`  | -                   |

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/iconfont.css";
@import "~/@vyron/mini-ui/style/appbar.css";
```
