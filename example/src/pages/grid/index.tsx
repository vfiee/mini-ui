import React, { Component } from "react";
import { Block, View, Text } from "@tarojs/components";
import { Row, Col } from "@vyron/mini-ui";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RowProps } from "@vyron/mini-ui/types/row";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ColProps } from "@vyron/mini-ui/types/col";
import "./index.less";

type GridOptions = Array<{
  label: string;
  grids: Array<{
    row: RowProps;
    cols: Array<ColProps>;
  }>;
}>;

const GRID_OPTIONS: GridOptions = [
  {
    label: "基础用法",
    grids: [
      // 布局
      {
        row: { gutter: 1 },
        cols: [{ span: 24 }],
      },
      {
        row: { gutter: 1 },
        cols: [{ span: 12 }, { span: 12 }],
      },
      {
        row: { gutter: 10 },
        cols: [{ span: 8 }, { span: 8 }, { span: 8 }],
      },
      {
        row: { gutter: 20 },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 30 },
        cols: [
          { span: 4 },
          { span: 4 },
          { span: 4 },
          { span: 4 },
          { span: 4 },
          { span: 4 },
        ],
      },
    ],
  },
  {
    label: "配置Row",
    grids: [
      {
        row: { gutter: 1, justify: "flex-start" },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 1, justify: "flex-end" },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 1, justify: "center" },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 1, justify: "space-evenly" },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 1, justify: "space-around" },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 1, justify: "space-between" },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: {
          gutter: 1,
          align: "flex-start",
          style: { height: "80rpx", backgroundColor: "#fff" },
        },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: {
          gutter: 1,
          align: "flex-end",
          style: { height: "80rpx", backgroundColor: "#fff" },
        },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: {
          gutter: 1,
          align: "center",
          style: { height: "80rpx", backgroundColor: "#fff" },
        },
        cols: [{ span: 6 }, { span: 6 }, { span: 6 }, { span: 6 }],
      },
      {
        row: { gutter: 10 },
        cols: [{ span: 8 }, { span: 8 }, { span: 8 }],
      },
      {
        row: { gutter: 20 },
        cols: [{ span: 8 }, { span: 8 }, { span: 8 }],
      },
    ],
  },
  {
    label: "配置Col",
    grids: [
      {
        row: { gutter: 1 },
        cols: [{ span: 6 }, { span: 6 }, { span: 6, offset: 6 }],
      },
      {
        row: { gutter: 1 },
        cols: [{ span: 6 }, { span: 6 }, { span: 6, push: 3 }],
      },
      {
        row: { gutter: 1 },
        cols: [{ span: 6 }, { span: 6 }, { span: 6, pull: 3 }],
      },
      {
        row: { gutter: 1 },
        cols: [
          { span: 6, order: 4 },
          { span: 6, order: 3 },
          { span: 6, order: 2 },
          { span: 6, order: 1 },
        ],
      },
    ],
  },
];

export default class GridExample extends Component {
  render() {
    return (
      <Block>
        {GRID_OPTIONS.map(({ label, grids = [] }) => {
          return (
            <View className="item" key={label}>
              {label && <View className="label">{label}</View>}
              {grids.map(({ row = {}, cols = [] }, _index) => {
                const { justify, align, gutter } = row;
                return (
                  <View className="grid" key={_index}>
                    <View className="info">
                      {justify ? `justify:${justify};` : ""}
                      {align ? `align:${align};` : ""}
                      {gutter ? `gutter:${gutter};` : ""}
                    </View>
                    <Row {...row}>
                      {cols.map((col, index) => {
                        // @ts-ignore
                        const { span, offset, pull, push, order } = col;
                        return (
                          // @ts-ignore
                          <Col key={index} {...col}>
                            <View className="col">
                              <Text className="index">{index + 1}</Text>
                              <View>{span ? `span-${span}` : ""}</View>
                              <View>{offset ? `offset-${offset}` : ""}</View>
                              <View>{pull ? `pull-${pull}` : ""}</View>
                              <View>{push ? `push-${push}` : ""}</View>
                              <View>{order ? `order-${order}` : ""}</View>
                            </View>
                          </Col>
                        );
                      })}
                    </Row>
                  </View>
                );
              })}
            </View>
          );
        })}
      </Block>
    );
  }
}
