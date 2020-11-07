import React, { useMemo } from "react";
import { View } from "@tarojs/components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ColProps } from "types/col";
import "./index.less";

const Col = (props: ColProps) => {
  const { offset, span, order, pull, push, className, ...restProps } = props;
  const colClassName = useMemo<string>(() => {
    let colCls: string[] = [];
    colCls.push(span && span > 0 ? `__col__${span}__` : "__col__hidden__");
    offset && offset > 0 && colCls.push(`__col__offset__${offset}__`);
    pull && pull > 0 && colCls.push(`__col__pull__${pull}__`);
    push && push > 0 && colCls.push(`__col__push__${push}__`);
    order && order >= 0 && colCls.push(`__col__order__${order}__`);
    return colCls.join(" ");
  }, [offset, order, pull, push, span]);
  return (
    <View
      {...restProps}
      className={`__col__ ${colClassName} ${className ?? ""}`}
    >
      {props?.children}
    </View>
  );
};

Col.defaultProps = {
  isCol: true,
};
Col.displayName = "Col";

export default Col;
