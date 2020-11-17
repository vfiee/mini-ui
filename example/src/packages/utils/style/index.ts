import kebabCase from "lodash.kebabcase";

declare type Style = string | React.CSSProperties | undefined;

function objectToString(style: Style): string {
  if (style == null) {
    return "";
  } else if (typeof style === "string") {
    return style;
  }
  let res: string = "";
  for (const [key, value] of Object.entries(style)) {
    if (value != null) {
      res += `${kebabCase(key)}: ${value};`;
    }
  }
  return res;
}

export function mergeStyle(baseStyles: Style, mergeStyles?: Style): string {
  baseStyles = objectToString(baseStyles);
  mergeStyles = objectToString(mergeStyles);
  return baseStyles + mergeStyles;
}
