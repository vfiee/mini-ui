import React, { useMemo } from "react";
import { View } from "@tarojs/components";
import { mergeStyle, MiniConsole } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RowProps } from "types/row";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const Row = (props: RowProps) => {
  const {
    align,
    justify,
    gutter,
    gutterUsePx,
    className,
    style,
    children,
    ...restProps
  } = props;
  const gutterUnit = gutterUsePx ? "px" : "rpx";
  // row style
  const rowStyle = useMemo(() => {
    const gutters = (Array.isArray(gutter) ? gutter : [gutter, 0]) as number[];
    const gutterStyle = {
      ...(gutters[0]! > 0
        ? {
            marginLeft: gutters[0]! / -2 + gutterUnit,
            marginRight: gutters[0]! / -2 + gutterUnit
          }
        : {}),
      ...(gutters[1]! > 0
        ? {
            marginTop: gutters[1]! / -2 + gutterUnit,
            marginBottom: gutters[1]! / 2 + gutterUnit
          }
        : {})
    };
    return mergeStyle(
      {
        alignItems: align,
        justifyContent: justify,
        ...gutterStyle
      },
      style
    );
  }, [align, gutter, gutterUnit, justify, style]);
  // row children(cols) style
  const colStyle = useMemo<object>(() => {
    const gutters = (Array.isArray(gutter) ? gutter : [gutter, 0]) as number[];
    const gutterStyle = {
      ...(gutters[0]! > 0
        ? {
            paddingLeft: gutters[0]! / 2 + gutterUnit,
            paddingRight: gutters[0]! / 2 + gutterUnit
          }
        : {}),
      ...(gutters[1]! > 0
        ? {
            paddingTop: gutters[1]! / 2 + gutterUnit,
            paddingBottom: gutters[1]! / 2 + gutterUnit
          }
        : {})
    };
    return gutterStyle;
  }, [gutter, gutterUnit]);
  return (
    <View
      {...restProps}
      style={rowStyle}
      className={`__row__ ${className ?? ""}`}
    >
      {React.Children.map(children, child => {
        // @ts-ignore
        if (child?.type?.displayName === "Col") {
          return React.cloneElement(child, {
            style: {
              ...colStyle,
              ...(child.props.style ?? {})
            }
          });
        }
        MiniConsole.warn(
          `The component Row only accepts Col as a subtype, other types will be ignored!`
        );
        return null;
      })}
    </View>
  );
};
Row.defaultProps = {
  align: "normal",
  justify: "normal",
  gutterUsePx: false,
  gutter: [0, 0]
};
Row.displayName = "Row";

export default Row;
