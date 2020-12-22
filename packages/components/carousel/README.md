# Carousel

轮播图组件,内置两种面板指示 dots 和 numbers,详见参数

## CarouselProps

| 参数 | 必填 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- | :-- | --- |
| `data` | 是 | 组件数据 | `{[key]:any}[]` | `[]` |
| `srcKey` | 否 | 组件数据 data 每一项的图片地址 key | `string` | `src` |
| `style` | 否 | 组件容器自定义样式 | `React.CSSProperties | string` | - |
| `className` | 否 | 组件容器自定义类 | `string` | - |
| `children` | 否 | 组件子元素 | `React.ReactNode` | - |
| `swiper` | 否 | siwper 属性 | `SwiperProps` | - |
| `swiperItem` | 否 | swiperItem 属性 | `SwiperItemProps` | - |
| `image` | 否 | image 组件属性 | `ImageProps` | - |
| `extra` | 否 | 额外元素 | `React.ReactNode` | - |
| `preview` | 否 | 是否展示图片(previewImage) | `boolean` | false |
| `showMenu` | 否 | 展示图片时,是否显示长按菜单 | `boolean` | false |

## SwiperProps

支持微信小程序 swiper 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html) | 参数 | 必填 | 说明 | 类型 | 默认值 | | :--------------------- | :--- | :------------------------------------------------------- | :-------------------------- | :------- | | `customIndicator` | 否 | 是否自定义指示面板 | `boolean` | `false` | | `indicatorType` | 否 | 指示面板类型,`dots | numbers`,自定义指示面板有效 | `string` | `dots` | | `indicatorPosition` | 否 | 指示面板位置,自定义指示面板有效,可选值: `topLeft | topCenter | topRight | leftTop | leftCenter | leftBottom | rightTop | rightCenter | rightBottom | bottomLeft | bottomRight | bottomCenter` | `string` | `bottomCenter` | | `wrapperClassName` | 否 | 指示面板容器自定义`className` | `string` | - | | `dotActiveLine` | 否 | 当前指示面板显示宽度增加,当`indicatorType`为`dots`时有效 | `boolean` | `false` | | `indicatorColor` | 否 | 指示点颜色 ,当`indicatorType`为`dots`时有效 |`string` | `rgba(0, 0, 0, .3)`| | `indicatorActiveColor` | 否 | 选中指示点颜色 ,当`indicatorType`为`dots`时有效 |`string` |`#000000` |

## SwiperItemProps

支持微信小程序 swiper-item 组件的其余参数 [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/swiper-item.html) | 参数 | 必填 | 说明 | 类型 | 默认值 | | :------ | :--- | :-------------------- | :----------------------------------------- | :----- | | `extra` | 否 | SwiperItem 的额外元素 | `(data: BaseObject) => React.ReactElement` | - |

## ImageProps

参考 Image 组件支持微信小程序 image 组件的其余参数(除 src 外) [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)

## 按需加载样式

```less
@import "~/@vyron/mini-ui/style/icon.less";
@import "~/@vyron/mini-ui/style/image.less";
@import "~/@vyron/mini-ui/style/carousel.less";
```
