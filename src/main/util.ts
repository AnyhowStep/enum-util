export function getKeys (e : {}) : string[] {
    return Object.keys(e).filter((k) => {
        return !/^\d/.test(k)
    });
}

export function isStringArray (arr : (string[])|(number[])) : arr is string[] {
    if (arr.length == 0) {
        return true; //Benefit of the doubt
    }
    return (typeof arr[0] == "string");
}

export function isNumberArray (arr : (string[])|(number[])) : arr is number[] {
    if (arr.length == 0) {
        return true; //Benefit of the doubt
    }
    return (typeof arr[0] == "number");
}

export function getValues (e : {}) : (string[])|(number[]) {
    const keys = getKeys(e);
    const values = keys.map((k) => {
        return (e as any)[k];
    });
    if (values.length == 0) {
        return [];
    }
    if (typeof values[0] == "string") {
        return values.filter((v) : v is string => {
            return typeof v == "string";
        });
    } else if (typeof values[0] == "number") {
        return values.filter((v) : v is number => {
            return typeof v == "number";
        });
    } else {
        throw new Error(`First element of enum was of type ${typeof values[0]}, expected string|number`);
    }
}

export function getStringValues (e : {}) : string[] {
    const values = getValues(e);
    if (!isStringArray(values)) {
        throw new Error(`Expected a values of enum to be string`);
    }
    return values;
}
export function getNumberValues (e : {}) : number[] {
    const values = getValues(e);
    if (!isNumberArray(values)) {
        throw new Error(`Expected a values of enum to be number`);
    }
    return values;
}
