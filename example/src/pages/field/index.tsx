import React from "react";
import { Block } from "@tarojs/components";
import { Field, CellGroup } from "mini-ui";
import "./index.less";

const Test = () => {
  return (
    <Block>
      <CellGroup title="基础用法">
        <Field label="用户名" placeholder="请输入文字" />
        <Field required label="密码" placeholder="请输入密码" />
      </CellGroup>

      <CellGroup title="文本域">
        <Field
          label="备注"
          showWordLimit
          type="textarea"
          placeholder="请输入备注信息"
          maxlength={300}
        />
      </CellGroup>

      <CellGroup title="自定义类型">
        <Field label="小数" type="digit" placeholder="请输入数字" />
        <Field label="整数" type="number" placeholder="请输入数字" />
        <Field label="电话" type="tel" placeholder="请输入电话" />
        <Field label="密码" type="password" placeholder="请输入密码" />
      </CellGroup>

      <CellGroup title="禁用和只读">
        <Field label="只读" placeholder="只读输入框" readonly />
        <Field label="禁用" placeholder="禁用输入框" disabled />
      </CellGroup>

      <CellGroup title="显示icon">
        <Field
          readonly
          label="返回icon"
          leftIcon="icon-back"
          placeholder="显示图标"
        />
        <Field
          readonly
          label="禁用"
          leftIcon="icon-close"
          placeholder="显示图标"
        />
      </CellGroup>
    </Block>
  );
};

export default Test;
