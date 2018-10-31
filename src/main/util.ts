export enum Enum {
}

export type StringKeyOf<T> = Extract<keyof T, string>;

export type StringEnum<E extends typeof Enum> = { [key in StringKeyOf<E>] : key };

export function getKeys<E extends typeof Enum> (e : E) : (StringKeyOf<E>)[] {
    return Object.keys(e)
        .filter<StringKeyOf<E>>((k) : k is StringKeyOf<E> => {
            return !/^\d/.test(k);
        });
}

export function getValues<E extends typeof Enum> (e : E) : (E[StringKeyOf<E>])[] {
    const keys = getKeys(e);
    const values = keys.map((k) => {
        return e[k];
    });
    return values;
}
function isKeyInternal<E extends typeof Enum> (keys : (StringKeyOf<E>)[], str : string) : str is StringKeyOf<E> {
    return keys.indexOf(str as any) >= 0;
}
function toStringEnumInternal<E extends typeof Enum> (keys : (StringKeyOf<E>)[]) : StringEnum<E> {
    const result : Partial<StringEnum<E>> = {};
    for (let k of keys) {
        result[k] = k;
    }
    return result as any;
}
function isValueInternal<E extends typeof Enum> (values : (E[StringKeyOf<E>])[], mixed : any) : mixed is E[StringKeyOf<E>] {
    return values.indexOf(mixed) >= 0;
}
function extractValuesInternal<E extends typeof Enum> (values : (E[StringKeyOf<E>])[], arr : any[]) : (E[StringKeyOf<E>])[] {
    const result : (E[StringKeyOf<E>])[] = [];
    for (let i of arr) {
        if (values.indexOf(i) >= 0) {
            result.push(i);
        }
    }
    return result;
}
function toKeyInternal<E extends typeof Enum, V extends number|string>(e: E, keys : (StringKeyOf<E>)[], value: V) : (
    {
        [key in StringKeyOf<E>] : (
            E[key] extends V ?
                key :
                never
        )
    }[StringKeyOf<E>]
);
function toKeyInternal<E extends typeof Enum, K extends StringKeyOf<E>> (e : E, keys : (StringKeyOf<E>)[], value : E[K]) : K;
function toKeyInternal<E extends typeof Enum> (e : E, keys : (StringKeyOf<E>)[], value : E[StringKeyOf<E>]) : StringKeyOf<E>;
function toKeyInternal<E extends typeof Enum> (e : E, keys : (StringKeyOf<E>)[], value : any) : (StringKeyOf<E>)|undefined;
function toKeyInternal<E extends typeof Enum> (e : E, keys : (StringKeyOf<E>)[], value : any) : (StringKeyOf<E>)|undefined {
    for (let k of keys) {
        if (e[k] === value) {
            return k;
        }
    }
    return undefined;
}

export function isKey<E extends typeof Enum> (e : E, str : string) : str is StringKeyOf<E> {
    return isKeyInternal(getKeys(e), str);
}
export function toStringEnum<E extends typeof Enum> (e : E) : StringEnum<E> {
    return toStringEnumInternal(getKeys(e));
}
//Only string|number are allowed to be enum values
export function isValue<E extends typeof Enum> (e : E, mixed : any) : mixed is E[StringKeyOf<E>] {
    return isValueInternal(getValues(e), mixed);
}
export function extractValues<E extends typeof Enum> (e : E, arr : any[]) : (E[StringKeyOf<E>])[] {
    return extractValuesInternal(getValues(e), arr);
}
export function toKey<E extends typeof Enum, V extends number|string>(e: E, value: V) : (
    {
        [key in StringKeyOf<E>] : (
            E[key] extends V ?
                key :
                never
        )
    }[StringKeyOf<E>]
);
export function toKey<E extends typeof Enum, K extends StringKeyOf<E>> (e : E, value : E[K]) : K;
export function toKey<E extends typeof Enum> (e : E, value : E[StringKeyOf<E>]) : StringKeyOf<E>;
export function toKey<E extends typeof Enum> (e : E, mixed : any) : (StringKeyOf<E>)|undefined;
export function toKey<E extends typeof Enum> (e : E, mixed : any) : (StringKeyOf<E>)|undefined {
    return toKeyInternal(e, getKeys(e), mixed);
}
export function getKeyCount<E extends typeof Enum> (e : E) : number {
    return getKeys(e).length;
}

export class WrappedEnum<E extends typeof Enum> {
    private readonly e : E;
    private readonly keys   : (StringKeyOf<E>)[];
    private readonly values : (E[StringKeyOf<E>])[];
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
    public isKey (str : string) : str is StringKeyOf<E> {
        return isKeyInternal(this.keys, str);
    }
    public toStringEnum () : StringEnum<E> {
        return toStringEnumInternal(this.keys);
    }
    public isValue (mixed : any) : mixed is E[StringKeyOf<E>] {
        return isValueInternal(this.keys, mixed);
    }
    public extractValues (arr : any[]) : (E[StringKeyOf<E>])[] {
        return extractValuesInternal(this.values, arr);
    }
    public toKey<V extends number|string>(mixed: V) : (
        {
            [key in StringKeyOf<E>] : (
                E[key] extends V ?
                    key :
                    never
            )
        }[StringKeyOf<E>]
    );
    public toKey<K extends StringKeyOf<E>> (mixed : E[K]) : K;
    public toKey (mixed : E[StringKeyOf<E>]) : StringKeyOf<E>;
    public toKey (mixed : any) : (StringKeyOf<E>)|undefined;
    public toKey (mixed : any) : (StringKeyOf<E>)|undefined {
        return toKeyInternal(this.e, this.keys, mixed);
    }
    public getKeyCount () : number {
        return this.keys.length;
    }
}
