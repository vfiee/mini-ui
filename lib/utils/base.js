var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * @param {any} target 检测的值
 * @returns {boolean} 返回布尔值,`true`表示是数组,`false`表示不是数组
 *
 */
var isArray = Array.isArray;
/**
 * 检测当前值是否为buffer类型
 * @params {any} value 检测的值
 * @returns {boolean} 返回boolean
 *
 */
var isBuffer = Buffer ? Buffer.isBuffer : function (_value) { return false; };
/**
 * 获取任意值的字符串类型
 * @param {any} value 转换为字符串的数据
 * @returns {string} 返回 Object.prototype.toString.call(value) 的值
 *
 */
var toString = function (value) {
    return objectProto.toString.call(value);
};
/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回 value的数据类型,如 string object function null undefined number ....
 *
 */
var getTypeof = function (value) {
    return toString(value).slice(8, -1);
};
/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
var isNull = function (value) { return value === null; };
/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
var isUndefined = function (value) {
    return typeof value === "undefined";
};
/**
 * 判断当前值是否为对象
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isObject = function (value) {
    return value != null && typeof value === "object";
};
/**
 * 检测当前值是否为Map类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isMap = function (value) { return getTypeof(value) === "Map"; };
/**
 * 检测当前值是否为WeakMap类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isWeakMap = function (value) {
    return getTypeof(value) === "WeakMap";
};
/**
 * 检测当前值是否为Set类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isSet = function (value) { return getTypeof(value) === "Set"; };
/**
 * 检测当前值是否为WeakSet类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isWeakSet = function (value) {
    return getTypeof(value) === "WeakSet";
};
/**
 * 检测当前值是否为Function类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isFunction = function (value) {
    return getTypeof(value) === "Function";
};
/**
 * 检测当前值是否为GeneratorFunction类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isGeneratorFunction = function (value) {
    return getTypeof(value) === "GeneratorFunction";
};
/**
 * 检测当前值是否为Promise类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isPromise = function (value) {
    return getTypeof(value) === "Promise";
};
/**
 * 检测当前值是否为RegExp类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isRegExp = function (value) { return getTypeof(value) === "RegExp"; };
/**
 * 检测当前值是否为Boolean类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isBoolean = function (value) {
    return typeof value === "boolean" || getTypeof(value) === "Boolean";
};
/**
 * 检测当前值是否为Arguments类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isArguments = function (value) {
    return (isObject(value) &&
        hasOwnProperty.call(value, "callee") &&
        objectProto.propertyIsEnumerable("callee") &&
        isFunction(value.callee));
};
/**
 * 检测当前值是否为Symbol类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
var isSymbol = function (value) { return getTypeof(value) === "Symbol"; };
/**
 * 检测当前值是否为空
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
var isEmpty = function (value) {
    if (value == null)
        return true;
    if (typeof value === "string" ||
        isArray(value) ||
        isBuffer(value) ||
        isArguments(value)) {
        return !value.length;
    }
    if (isSet(value) || isMap(value)) {
        return !value.size;
    }
    for (var key in value) {
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
function compact(value, fn, deep) {
    if (deep === void 0) { deep = false; }
    var predicate = fn || Boolean;
    if (isArray(value)) {
        return value.filter(predicate);
    }
    if (!isObject(value))
        return value;
    var keys = Object.keys(value);
    if (keys.length <= 0)
        return value;
    var res = {};
    for (var i = 0, len = keys.length; i < len; i++) {
        var item = value[keys[i]];
        if (deep && (isArray(item) || isObject(item))) {
            res[keys[i]] = compact(item, predicate);
        }
        else if (!predicate(item)) {
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
var keys = Object.keys;
/**
 * 遍历对象并返回对象可枚举属性值组成的数组
 * @param {object} value 遍历对象
 * @returns {any[]} 返回对象的自身可枚举属性值组成的数组
 *
 */
var values = Object.values;
var forEach = function (value, callback, thisArg) {
    if (isArray(value)) {
        return value.forEach(callback, thisArg);
    }
    else if (isObject(value) && keys(value).length > 0) {
        return foreachObject(value, callback, thisArg);
    }
};
/**
 * 遍历对象并执行回调
 * @param {BaseObject} object 遍历的对象
 * @param {ForEachCallback} callback 遍历执行的回调函数
 * @param {any} thisArg 回调函数作用域
 */
var foreachObject = function (object, callback, thisArg) {
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            callback.call(thisArg, object[key], key, object);
        }
    }
};
function pick(object, props) {
    var _a;
    var res = {};
    if (isEmpty(object))
        return res;
    if (typeof props === "string") {
        return hasOwnProperty.call(object, props)
            ? (_a = {}, _a[props] = object[props], _a) : res;
    }
    else if (isArray(props) && props.length > 0) {
        forEach(props, function (value) {
            if (hasOwnProperty.call(object, value)) {
                res[value] = object[value];
            }
        });
    }
    else if (isFunction(props)) {
        forEach(object, function (value, key) {
            if (props(value, key)) {
                res[value] = object[value];
            }
        });
    }
    return res;
}
function merge(_a, isDeep) {
    var object = _a.object, source = _a.source;
    if (isDeep === void 0) { isDeep = false; }
    if (!isDeep) {
        return Object.assign({}, object, source);
    }
    var res = {};
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            if (hasOwnProperty.call(source, key)) {
                if (isObject(object[key]) && isObject(source[key])) {
                    res[key] = merge({ object: object[key], source: source[key] }, isDeep);
                }
                res[key] = source[key];
            }
            res[key] = object[key];
        }
    }
    return res;
}

export { compact, forEach, foreachObject, getTypeof, hasOwnProperty, isArguments, isArray, isBoolean, isBuffer, isEmpty, isFunction, isGeneratorFunction, isMap, isNull, isObject, isPromise, isRegExp, isSet, isSymbol, isUndefined, isWeakMap, isWeakSet, keys, merge, objectProto, pick, toString, values };
//# sourceMappingURL=base.js.map
