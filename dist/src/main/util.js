"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getKeys(e) {
    return Object.keys(e).filter((k) => {
        return !/^\d/.test(k);
    });
}
exports.getKeys = getKeys;
function isStringArray(arr) {
    if (arr.length == 0) {
        return true; //Benefit of the doubt
    }
    return (typeof arr[0] == "string");
}
exports.isStringArray = isStringArray;
function isNumberArray(arr) {
    if (arr.length == 0) {
        return true; //Benefit of the doubt
    }
    return (typeof arr[0] == "number");
}
exports.isNumberArray = isNumberArray;
function getValues(e) {
    const keys = getKeys(e);
    const values = keys.map((k) => {
        return e[k];
    });
    if (values.length == 0) {
        return [];
    }
    if (typeof values[0] == "string") {
        return values.filter((v) => {
            return typeof v == "string";
        });
    }
    else if (typeof values[0] == "number") {
        return values.filter((v) => {
            return typeof v == "number";
        });
    }
    else {
        throw new Error(`First element of enum was of type ${typeof values[0]}, expected string|number`);
    }
}
exports.getValues = getValues;
function getStringValues(e) {
    const values = getValues(e);
    if (!isStringArray(values)) {
        throw new Error(`Expected a values of enum to be string`);
    }
    return values;
}
exports.getStringValues = getStringValues;
function getNumberValues(e) {
    const values = getValues(e);
    if (!isNumberArray(values)) {
        throw new Error(`Expected a values of enum to be number`);
    }
    return values;
}
exports.getNumberValues = getNumberValues;
//# sourceMappingURL=util.js.map