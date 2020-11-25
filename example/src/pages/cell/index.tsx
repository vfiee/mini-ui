import React from "react";
import { View, Text } from "@tarojs/components";
import { Cell, CellGroup } from "mini-ui";
import "./index.less";

const TestCell = () => {
  return (
    <View className="wrap">
      <CellGroup title="基础用法">
        <Cell title="默认情况" value="默认情况" />
        <Cell
          label="描述信息"
          value="value是必填的"
          title="我是很长很长很长很长很长的描述信息"
        />
        <Cell
          center
          title="我是很长很长很长很长很长的描述信息"
          label="描述信息"
          value="居中显示"
        />
        <Cell center required title="必填" value="value是必填的" />
      </CellGroup>

      <CellGroup title="自定义Icon">
        <Cell arrow center title="展示箭头" value="value是必填的" />
        <Cell
          arrow
          center
          title="展示箭头,改变方向"
          arrowDirection="down"
          value="展示箭头,改变方向"
        />
        <Cell
          required
          center
          icon="icon-close"
          title="自定义左边Icon"
          value="value是必填的"
        />
        <Cell
          center
          rightIcon="icon-close"
          title="自定义右边Icon"
          value="value是必填的"
        />
        <Cell
          title="自定义Icon元素"
          value="value必填"
          icon={<View>[icon]</View>}
          rightIcon={<View>[icon]</View>}
        />
      </CellGroup>

      <CellGroup title="其它">
        <Cell title="跳转到首页" replace center url="/pages/index/index" />
        <Cell title="必填项" required value="默认" />
        <Cell title="去除border" border={false} required value="默认" />
        <Cell
          center
          colon
          value="默认"
          title={<Text className="custom-title">自定义标题</Text>}
        />
      </CellGroup>
    </View>
  );
};

export default TestCell;
