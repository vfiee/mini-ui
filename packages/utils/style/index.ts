declare type Style = string | React.CSSProperties | undefined;

function styleToObject(style?: Style): React.CSSProperties {
  if (style == null || style === "") {
    // none
    return {};
  } else if (typeof style === "object" && !Array.isArray(style)) {
    // object
    return style;
  }
  // string
  return (style as string).split(";").reduce((res, css) => {
    const [key, value] = css.split(";");
    res[key] = value;
    return res;
  }, {});
}

export const mergeStyle = (baseStyle: Style, combineStyle?: Style) => ({
  ...styleToObject(baseStyle),
  ...styleToObject(combineStyle)
});
