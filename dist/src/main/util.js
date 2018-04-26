"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enum;
(function (Enum) {
})(Enum = exports.Enum || (exports.Enum = {}));
function getKeys(e) {
    return Object.keys(e)
        .filter((k) => {
        return !/^\d/.test(k);
    });
}
exports.getKeys = getKeys;
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
function isKey(e, str) {
    return isKeyInternal(getKeys(e), str);
}
exports.isKey = isKey;
function toStringEnum(e) {
    return toStringEnumInternal(getKeys(e));
}
exports.toStringEnum = toStringEnum;
//Only string|number are allowed to be enum values
function isValue(e, mixed) {
    return isValueInternal(getValues(e), mixed);
}
exports.isValue = isValue;
function extractValues(e, arr) {
    return extractValuesInternal(getValues(e), arr);
}
exports.extractValues = extractValues;
function toKey(e, mixed) {
    return toKeyInternal(e, getKeys(e), mixed);
}
exports.toKey = toKey;
class WrappedEnum {
    constructor(e) {
        this.e = e;
        this.keys = getKeys(e);
        this.values = getValues(e);
    }
    getEnum() {
        return this.e;
    }
    getKeys() {
        return [...this.keys];
    }
    getValues() {
        return [...this.values];
    }
    isKey(str) {
        return isKeyInternal(this.keys, str);
    }
    toStringEnum() {
        return toStringEnumInternal(this.keys);
    }
    isValue(mixed) {
        return isValueInternal(this.keys, mixed);
    }
    extractValues(arr) {
        return extractValuesInternal(this.values, arr);
    }
    toKey(mixed) {
        return toKeyInternal(this.e, this.keys, mixed);
    }
}
exports.WrappedEnum = WrappedEnum;
//# sourceMappingURL=util.js.map