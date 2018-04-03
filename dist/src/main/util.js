"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enum;
(function (Enum) {
})(Enum = exports.Enum || (exports.Enum = {}));
function getKeys(e) {
    return Object.keys(e).filter((k) => {
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
function toEnumValue(val, e) {
    return getValues(e).find(v => v === val);
}
exports.toEnumValue = toEnumValue;
function isKeyInternal(keys, str) {
    return keys.indexOf(str) >= 0;
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
function isKey(e, str) {
    return isKeyInternal(getKeys(e), str);
}
exports.isKey = isKey;
//Only string|number are allowed to be enum values
function isValue(e, mixed) {
    return isValueInternal(getValues(e), mixed);
}
exports.isValue = isValue;
function extractValues(e, arr) {
    return extractValuesInternal(getValues(e), arr);
}
exports.extractValues = extractValues;
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
    isValue(mixed) {
        return isValueInternal(this.keys, mixed);
    }
    extractValues(arr) {
        return extractValuesInternal(this.values, arr);
    }
}
exports.WrappedEnum = WrappedEnum;
//# sourceMappingURL=util.js.map