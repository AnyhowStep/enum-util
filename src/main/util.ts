export enum Enum {
}

export type StringEnum<E extends typeof Enum> = { [key in keyof E] : key };

export function getKeys<E extends typeof Enum> (e : E) : (keyof E)[] {
    return Object.keys(e).filter((k) : k is keyof E => {
        return !/^\d/.test(k)
    });
}

export function getValues<E extends typeof Enum> (e : E) : (E[keyof E])[] {
    const keys = getKeys(e);
    const values = keys.map((k) => {
        return e[k];
    });
    return values;
}

function isKeyInternal<E extends typeof Enum> (keys : (keyof E)[], str : string) : str is keyof E {
    return keys.indexOf(str as any) >= 0;
}
function toStringEnumInternal<E extends typeof Enum> (keys : (keyof E)[]) : StringEnum<E> {
    const result : Partial<StringEnum<E>> = {};
    for (let k of keys) {
        result[k] = k;
    }
    return result as any;
}
function isValueInternal<E extends typeof Enum> (values : (E[keyof E])[], mixed : any) : mixed is E[keyof E] {
    return values.indexOf(mixed) >= 0;
}
function extractValuesInternal<E extends typeof Enum> (values : (E[keyof E])[], arr : any[]) : (E[keyof E])[] {
    const result : (E[keyof E])[] = [];
    for (let i of arr) {
        if (values.indexOf(i) >= 0) {
            result.push(i);
        }
    }
    return result;
}
function toKeyInternal<E extends typeof Enum> (e : E, keys : (keyof E)[], value : any) : (keyof E)|undefined{
    for (let k of keys) {
        if (e[k] === value) {
            return k;
        }
    }
    return undefined;
}

export function isKey<E extends typeof Enum> (e : E, str : string) : str is keyof E {
    return isKeyInternal(getKeys(e), str);
}
export function toStringEnum<E extends typeof Enum> (e : E) : StringEnum<E> {
    return toStringEnumInternal(getKeys(e));
}
//Only string|number are allowed to be enum values
export function isValue<E extends typeof Enum> (e : E, mixed : any) : mixed is E[keyof E] {
    return isValueInternal(getValues(e), mixed);
}
export function extractValues<E extends typeof Enum> (e : E, arr : any[]) : (E[keyof E])[] {
    return extractValuesInternal(getValues(e), arr);
}
export function toKey<E extends typeof Enum> (e : E, mixed : any) : (keyof E)|undefined {
    return toKeyInternal(e, getKeys(e), mixed);
}

export class WrappedEnum<E extends typeof Enum> {
    private readonly e : E;
    private readonly keys   : (keyof E)[];
    private readonly values : (E[keyof E])[];
    public constructor (e : E) {
        this.e = e;
        this.keys   = getKeys(e);
        this.values = getValues(e);
    }
    public getEnum () {
        return this.e;
    }
    public getKeys () {
        return [...this.keys];
    }
    public getValues () {
        return [...this.values];
    }
    public isKey (str : string) : str is keyof E {
        return isKeyInternal(this.keys, str);
    }
    public toStringEnum () : StringEnum<E> {
        return toStringEnumInternal(this.keys);
    }
    public isValue (mixed : any) : mixed is E[keyof E] {
        return isValueInternal(this.keys, mixed);
    }
    public extractValues (arr : any[]) : (E[keyof E])[] {
        return extractValuesInternal(this.values, arr);
    }
    public toKey (mixed : any) : (keyof E)|undefined {
        return toKeyInternal(this.e, this.keys, mixed);
    }
}
