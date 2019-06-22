"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The base enum type.
 * Every other enum-like type should extend this type.
 */
var Enum;
(function (Enum) {
})(Enum = exports.Enum || (exports.Enum = {}));
/**
 * Gets the keys of an `enum`.
 *
 * ```ts
 * enum Foo {
 *      A = 0,
 *      B = 1,
 *      C = 2,
 * }
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * //("A"|"B"|"C")[]
 * getKeys(Foo);
 * //("X"|"Y"|"Z")[]
 * getKeys(Bar);
 * ```
 *
 * @param e - The `enum` to get the keys of
 * @returns An array of keys
 */
function getKeys(e) {
    return Object.keys(e)
        .filter((k) => {
        return !/^\d/.test(k);
    });
}
exports.getKeys = getKeys;
/**
 * Gets the values of an `enum`.
 *
 * ```ts
 * enum Foo {
 *      A = 0,
 *      B = 1,
 *      C = 2,
 * }
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * //(0|1|2)[]
 * getValues(Foo);
 * //("eks"|"wai"|"zee")[]
 * getValues(Bar);
 * ```
 *
 * @param e - The `enum` to get the values of
 * @returns An array of values
 */
function getValues(e) {
    const keys = getKeys(e);
    const values = keys.map((k) => {
        return e[k];
    });
    return values;
}
exports.getValues = getValues;
function isKeyInternal(keys, str) {
    return keys.indexOf(str) >= 0;
}
function toStringEnumInternal(keys) {
    const result = {};
    for (let k of keys) {
        result[k] = k;
    }
    return result;
}
function isValueInternal(values, mixed) {
    return values.indexOf(mixed) >= 0;
}
function extractValuesInternal(values, arr) {
    const result = [];
    for (let i of arr) {
        if (values.indexOf(i) >= 0) {
            result.push(i);
        }
    }
    return result;
}
function toKeyInternal(e, keys, value) {
    for (let k of keys) {
        if (e[k] === value) {
            return k;
        }
    }
    return undefined;
}
/**
 * Tells you if the `string` is a key of the `enum`.
 *
 * ```ts
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * isKey(Bar, "X"); //true
 * isKey(Bar, "Y"); //true
 * isKey(Bar, "Z"); //true
 * isKey(Bar, "x"); //false
 * isKey(Bar, "y"); //false
 * isKey(Bar, "z"); //false
 * isKey(Bar, "eks"); //false
 * isKey(Bar, "wai"); //false
 * isKey(Bar, "zee"); //false
 * ```
 *
 * @param e - The `enum` we are checking against
 * @param str - The `string` that may or may not be a key of the `enum`
 * @returns A type guard boolean that tells you if `str` is a key of `enum`
 */
function isKey(e, str) {
    return isKeyInternal(getKeys(e), str);
}
exports.isKey = isKey;
/**
 * Converts an `enum` of type `key => value` into
 * an `enum` of type `key => key`.
 *
 * ```ts
 * enum Foo {
 *      A = 0,
 *      B = 1,
 *      C = 2,
 * }
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * //{ A="A", B="B", C="C" }
 * toStringEnum(Foo);
 * //{ X="X", Y="Y", Z="Z" }
 * toStringEnum(Bar);
 * ```
 *
 * @param e - The `enum` to convert
 * @todo Rename to `toKeyEnum<>()`?
 */
function toStringEnum(e) {
    return toStringEnumInternal(getKeys(e));
}
exports.toStringEnum = toStringEnum;
/**
 * Tells you if `mixed` is a value of the `enum`.
 *
 * ```ts
 * enum Foo {
 *      A = 0,
 *      B = 1,
 *      C = 2,
 * }
 * isValue(Foo, "A"); //false
 * isValue(Foo, "B"); //false
 * isValue(Foo, "C"); //false
 * isValue(Foo, "a"); //false
 * isValue(Foo, "b"); //false
 * isValue(Foo, "c"); //false
 * isValue(Foo, 0); //true
 * isValue(Foo, 1); //true
 * isValue(Foo, 2); //true
 *
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * isValue(Bar, "X"); //false
 * isValue(Bar, "Y"); //false
 * isValue(Bar, "Z"); //false
 * isValue(Bar, "x"); //false
 * isValue(Bar, "y"); //false
 * isValue(Bar, "z"); //false
 * isValue(Bar, "eks"); //true
 * isValue(Bar, "wai"); //true
 * isValue(Bar, "zee"); //true
 * ```
 *
 * @param e - The `enum` we are checking against
 * @param mixed - The `mixed` value that may or may not be a value of the `enum`
 * @returns A type guard boolean that tells you if `mixed` is a value of `enum`
 */
function isValue(e, mixed) {
    return isValueInternal(getValues(e), mixed);
}
exports.isValue = isValue;
/**
 * The same effect as the following code snippet,
 *
 * ```ts
 * arr.filter(mixed => isValue(MyEnum, mixed))
 * ```
 *
 * For example,
 *
 * ```ts
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * //["eks", "wai", "zee", "zee", "wai", "eks"]
 * extractValues(Bar, ["X", "Y", "Z", "x", "y", "z", "eks", "wai", "zee", "zee", "wai", "eks"]);
 * ```
 *
 * @param e - The `enum` we are checking against
 * @param arr - The array of mixed values we want to filter against
 * @returns An array of values that are elements of `arr` and values of `e`
 */
function extractValues(e, arr) {
    return extractValuesInternal(getValues(e), arr);
}
exports.extractValues = extractValues;
function toKey(e, mixed) {
    return toKeyInternal(e, getKeys(e), mixed);
}
exports.toKey = toKey;
/**
 * Counts the number of elements of an `enum`.
 *
 * ```ts
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * //3
 * getKeyCount(Bar);
 * ```
 *
 * @param e - The `enum` we are checking against
 * @returns The number of elements in the `enum`
 */
function getKeyCount(e) {
    return getKeys(e).length;
}
exports.getKeyCount = getKeyCount;
class WrappedEnum {
    /**
     * @param e - The `enum` to wrap
     */
    constructor(e) {
        this.e = e;
        this.keys = getKeys(e);
        this.values = getValues(e);
    }
    /**
     * Returns the original, unwrapped `enum`.
     */
    getEnum() {
        return this.e;
    }
    /**
     * Gets the keys of the `enum`.
     */
    getKeys() {
        return [...this.keys];
    }
    /**
     * Gets the values of the `enum`.
     */
    getValues() {
        return [...this.values];
    }
    /**
     * Tells you if the `string` is a key of the `enum`.
     *
     * @param str - The `string` that may or may not be a key of the `enum`
     * @returns A type guard boolean that tells you if `str` is a key of `enum`
     */
    isKey(str) {
        return isKeyInternal(this.keys, str);
    }
    /**
     * Converts an `enum` of type `key => value` into
     * an `enum` of type `key => key`.
     *
     * @todo Rename to `toKeyEnum<>()`?
     */
    toStringEnum() {
        return toStringEnumInternal(this.keys);
    }
    /**
     * Tells you if `mixed` is a value of the `enum`.
     *
     * @param mixed - The `mixed` value that may or may not be a value of the `enum`
     * @returns A type guard boolean that tells you if `mixed` is a value of `enum`
     */
    isValue(mixed) {
        return isValueInternal(this.keys, mixed);
    }
    /**
     * The same effect as the following code snippet,
     *
     * ```ts
     * arr.filter(mixed => isValue(MyEnum, mixed))
     * ```
     *
     * @param arr - The array of mixed values we want to filter against
     * @returns An array of values that are elements of `arr` and values of the `enum`
     */
    extractValues(arr) {
        return extractValuesInternal(this.values, arr);
    }
    toKey(mixed) {
        return toKeyInternal(this.e, this.keys, mixed);
    }
    /**
     * Counts the number of elements of an `enum`.
     *
     * @returns The number of elements in the `enum`
     */
    getKeyCount() {
        return this.keys.length;
    }
}
exports.WrappedEnum = WrappedEnum;
//# sourceMappingURL=util.js.map