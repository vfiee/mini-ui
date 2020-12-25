declare type Style = string | React.CSSProperties | undefined;
declare type Modifer = string | Record<string, any>;
declare type Modifers = Modifer | Modifer[];

/**
 * 将样式转换为React.CSSProperties样式
 * @param {Style} style 转换的样式
 * @returns {React.CSSProperties} 返回转换后的React.CSSProperties样式
 *
 */
export const styleToObject = (style?: Style): React.CSSProperties => {
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
};

/**
 * 合并样式,支持字符串和 CSSProperties
 * @param {Style} baseStyle 样式
 * @param {Style} combineStyle 覆盖样式
 * @returns {React.CSSProperties} 返回合并后的样式
 */
export const mergeStyle = (baseStyle: Style, combineStyle?: Style) => ({
  ...styleToObject(baseStyle),
  ...styleToObject(combineStyle)
});

const MINI_UI_BEM_PREFFIX = "mini-";
/**
 * 创建符合BEM规范的样式
 * 四种形式
 * 1. Block
 * 2. Block__Element
 * 3. Block--Modifer
 * 4. Block__Element--Modifer
 * @param {string} name 创建BEM规范的组件名称
 * @returns {Function} 返回创建BEM的函数,支持元素和修饰符
 * @example
 * const bem = createBEM('button');
 * // returns bem
 *
 * @example
 * bem('text')
 * // returns button button__text
 *
 * @example
 * bem({ primary:true })
 * // returns button button--primary
 *
 * @example
 * bem(['primary','readonly'])
 * // returns button button--primary button--readonly
 *
 * @example
 * bem("link",{ large:true, primary:true })
 * // returns button button__link button__link--large button__link--primary
 *
 *
 */
export const createBEM = (name: string) => {
  name = MINI_UI_BEM_PREFFIX + name;
  return (element?: Modifers, modifers?: Modifers) => {
    if (element && typeof element !== "string") {
      modifers = element;
      element = "";
    }
    element = element ? `${name}__${element}` : name;
    return `${element}${generateBem(element, modifers)}`;
  };
};

export const generateBem = (ele: string, mods?: Modifers) => {
  if (!mods) return "";
  if (typeof mods === "string") {
    return ` ${ele}--${mods}`;
  } else if (Array.isArray(mods)) {
    return mods.reduce((res, item) => res + generateBem(ele, item), "");
  }
  return Object.keys(mods).reduce(
    (res, key) => res + (mods[key] ? generateBem(ele, key) : ""),
    ""
  );
};
