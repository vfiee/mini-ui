// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseObject } from "types";

export const objectProto = Object.prototype;

export const hasOwnProperty = objectProto.hasOwnProperty;

/**
 * @param {any} target 检测的值
 * @returns {boolean} 返回布尔值,`true`表示是数组,`false`表示不是数组
 *
 */
export const isArray = Array.isArray;

/**
 * 检测当前值是否为buffer类型
 * @params {any} value 检测的值
 * @returns {boolean} 返回boolean
 *
 */
export const isBuffer = Buffer ? Buffer.isBuffer : (_value: any) => false;

/**
 * 获取任意值的字符串类型
 * @param {any} value 转换为字符串的数据
 * @returns {string} 返回 Object.prototype.toString.call(value) 的值
 *
 */
export const toString = (value: any): string =>
  objectProto.toString.call(value);

/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回 value的数据类型,如 string object function null undefined number ....
 *
 */
export const getTypeof = (value: any): string => {
  return toString(value).slice(8, -1);
};

/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
export const isNull = (value: any): boolean => value === null;

/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
export const isUndefined = (value: any): boolean =>
  typeof value === "undefined";

/**
 * 判断当前值是否为对象
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
export const isObject = (value: any): boolean => {
  return value != null && typeof value === "object";
};

/**
 * 检测当前值是否为Map类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isMap = (value: any): boolean => getTypeof(value) === "Map";

/**
 * 检测当前值是否为WeakMap类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isWeakMap = (value: any): boolean =>
  getTypeof(value) === "WeakMap";

/**
 * 检测当前值是否为Set类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isSet = (value: any): boolean => getTypeof(value) === "Set";

/**
 * 检测当前值是否为WeakSet类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isWeakSet = (value: any): boolean =>
  getTypeof(value) === "WeakSet";

/**
 * 检测当前值是否为Function类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isFunction = (value: any): boolean =>
  getTypeof(value) === "Function";

/**
 * 检测当前值是否为GeneratorFunction类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isGeneratorFunction = (value: any): boolean =>
  getTypeof(value) === "GeneratorFunction";

/**
 * 检测当前值是否为Promise类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isPromise = (value: any): boolean =>
  getTypeof(value) === "Promise";

/**
 * 检测当前值是否为RegExp类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isRegExp = (value: any): boolean => getTypeof(value) === "RegExp";

/**
 * 检测当前值是否为Boolean类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
export const isBoolean = (value: any): boolean =>
  typeof value === "boolean" || getTypeof(value) === "Boolean";

/**
 * 检测当前值是否为Arguments类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
export const isArguments = (value: any): boolean => {
  return (
    isObject(value) &&
    hasOwnProperty.call(value, "callee") &&
    objectProto.propertyIsEnumerable("callee") &&
    isFunction(value.callee)
  );
};

/**
 * 检测当前值是否为Symbol类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */

export const isSymbol = (value: any): boolean => getTypeof(value) === "Symbol";

/**
 * 检测当前值是否为空
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (
    typeof value === "string" ||
    isArray(value) ||
    isBuffer(value) ||
    isArguments(value)
  ) {
    return !value.length;
  }
  if (isSet(value) || isMap(value)) {
    return !value.size;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
};

/**
 * 过滤掉目标对象中的被Boolean转为false的值
 * @param { [] | object } value
 * @param {(arg: any) => boolean} fn 每次过滤执行的函数
 * @returns { [] | object } 返回过滤后的值
 */

export function compact<T>(
  value: T,
  fn?: (arg: any) => boolean,
  deep: boolean = false
): T {
  const predicate = fn || Boolean;
  if (isArray(value)) {
    return value.filter(predicate) as any;
  }
  if (!isObject(value)) return value;
  let keys = Object.keys(value);
  if (keys.length <= 0) return value;
  let res = <T>{};
  for (let i = 0, len = keys.length; i < len; i++) {
    let item = value[keys[i]];
    if (deep && (isArray(item) || isObject(item))) {
      res[keys[i]] = compact(item, predicate);
    } else if (!predicate(item)) {
      res[keys[i]] = item;
    }
  }
  return res;
}

/**
 *
 * 遍历对象并返回对象可枚举属性组成的数组
 * @param {object} value 遍历对象
 * @returns {string[]} 返回对象的自身可枚举属性组成的数组
 *
 */

export const keys = Object.keys;

/**
 * 遍历对象并返回对象可枚举属性值组成的数组
 * @param {object} value 遍历对象
 * @returns {any[]} 返回对象的自身可枚举属性值组成的数组
 *
 */
export const values = Object.values;

/**
 *
 * @param value 检索的对象
 * @param callback 循环时每个元素的回调
 * @param thisArg 回调函数作用域
 */

export type ForEachCallback<T = BaseObject | any[]> = (
  value: any,
  key?: number,
  target?: T
) => any;
export const forEach = (
  value: BaseObject | any[],
  callback: ForEachCallback,
  thisArg?: any
) => {
  if (isArray(value)) {
    return value.forEach(callback, thisArg);
  } else if (isObject(value) && keys(value).length > 0) {
    return foreachObject(value, callback, thisArg);
  }
};

/**
 * 遍历对象并执行回调
 * @param {BaseObject} object 遍历的对象
 * @param {ForEachCallback} callback 遍历执行的回调函数
 * @param {any} thisArg 回调函数作用域
 */
export const foreachObject = (
  object: BaseObject,
  callback: ForEachCallback,
  thisArg: any
) => {
  for (const key in object) {
    if (hasOwnProperty.call(object, key)) {
      callback.call(thisArg, object[key], key, object);
    }
  }
};

/**
 * 创建一个从object中选取属性的对象
 * @param {object} object 来源对象
 * @param {string | string[] | predicate } props 需要获取的属性或自定义是否获取,
 * 返回true则获取,false则忽略
 * @returns {object} 返回新对象
 *
 */

declare type predicate = (value: string, key: string | number) => boolean;
export function pick(object: BaseObject, props: string | string[] | predicate) {
  let res: BaseObject = {};
  if (isEmpty(object)) return res;
  if (typeof props === "string") {
    return hasOwnProperty.call(object, props)
      ? { [props]: object[props] }
      : res;
  } else if (isArray(props) && props.length > 0) {
    forEach(props, value => {
      if (hasOwnProperty.call(object, value)) {
        res[value] = object[value];
      }
    });
  } else if (isFunction(props)) {
    forEach(object, (value, key) => {
      if ((props as Function)(value, key)) {
        res[value] = object[value];
      }
    });
  }
  return res;
}

declare type MergeProps = {
  object: BaseObject;
  source: BaseObject;
};
export function merge(
  { object, source }: MergeProps,
  isDeep: boolean = false
): BaseObject {
  if (!isDeep) {
    return Object.assign({}, object, source);
  }
  let res = {};
  for (const key in object) {
    if (hasOwnProperty.call(object, key)) {
      if (hasOwnProperty.call(source, key)) {
        if (isObject(object[key]) && isObject(source[key])) {
          res[key] = merge(
            { object: object[key], source: source[key] },
            isDeep
          );
        }
        res[key] = source[key];
      }
      res[key] = object[key];
    }
  }
  return res;
}
