/// <reference types="react" />
import { ScrollViewProps } from "@tarojs/components/types/ScrollView";
import { BaseObject, CustomStyle } from "./index";

declare type OmitScrollViewProps =
  | "scrollX"
  | "scrollY"
  | "refresherEnabled"
  | "refreshTriggered";

declare interface ListProps extends Omit<ScrollViewProps, OmitScrollViewProps> {
  // list
  hasMore?: boolean; // 是否还可以继续上拉加载
  data?: BaseObject[]; // 组件展示时的数据
  ListComponent?: React.ComponentType; // 配合data和ListComponent渲染列表
  children?: React.ReactElement | string; // 可自行渲染子元素,也可配合data和ListComponent渲染
  // refresher
  firstTriggered?: boolean; // 是否启用第一次刷新
  onRefresh?: Function; // 下拉刷新,一般用于请求数据
  onRefreshCancel?: Function; // 下拉刷新取消或复位
  onReachBottom?: Function; // 滑动到底部的回调,一般用于请求数据
  refresherStayTime?: number; // 刷新成功或失败提示持续时长,默认700ms
  refresherClassName?: string; // 自定义类名
  refresherStyle?: CustomStyle; // 自定义样式
  // loading
  loading?: React.ReactElement; // 自定义loading
  loadingText?: string; // 滑动到底部加载时显示的文字(自定义时无效)
  loadingClass?: string; // 自定义类名
  loadingStyle?: CustomStyle; // 自定义样式
  // error
  error?: React.ReactElement; // 自定义error
  errorText?: string; // 滑动到底部请求错误时显示的文字(自定义时无效)
  errorClass?: string; // 自定义类名
  errorStyle?: CustomStyle; // 自定义样式
}

declare const List: React.ComponentType<ListProps>;

export { List, ListProps };
