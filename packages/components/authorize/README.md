# Authorize

获取微信授权,授权类型分为两种:  
1.小程序 Button 按钮的 OpenType 类型,[参考文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)  
2.请求获取用户侧授权信息,[参考文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)

## 参数

|     参数      | 必填 | 说明                                                                                                                                  | 类型                | 默认值         |
| :-----------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------ | :------------- |
|  `authorize`  |  否  | 是否已授权,已授权将不会再发起授权类型 1 的弹框                                                                                        | `boolean`           | `false`        |
|  `openType`   |  否  | 开发能力,当发起类型 2 授权时,openType 需设置为`scope`                                                                                 | `contact            | getPhoneNumber | getUserInfo | launchApp | scope` | - |
|  `authScope`  |  否  | 类型 2 的授权类型                                                                                                                     | `werun              | record         | camera | userLocation | writePhotosAlbum | userLocationBackground` | - |
| `onAuthorize` |  否  | 授权回调,在授权类型上有所不同,<br>1. 直接返回开发能力返回的结果.<br>2.第一个参数返回对象`{authorized:boolean}`,第二个参数返回事件对象 | `Function`          | -              |
|  `children`   |  否  | 子元素                                                                                                                                | `React.ReactElement | string         | string[]` | - |

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/authorize.css";
```
