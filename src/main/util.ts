/**
 * The base enum type.
 * Every other enum-like type should extend this type.
 */
export enum Enum {
}

/**
 * The keys of a type may be `string|number|symbol`.
 * This gives us only the `string` keys as `enum` keys
 * should all be `string`.
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
 * //"A"|"B"|"C"
 * type FooStringKey = StringKeyOf<Foo>;
 * //"X"|"Y"|"Z"
 * type BarStringKey = StringKeyOf<Bar>;
 * ```
 */
export type StringKeyOf<T> = Extract<keyof T, string>;

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
 * type FooStringEnum = StringEnum<Foo>;
 * //{ X="X", Y="Y", Z="Z" }
 * type BarStringEnum = StringEnum<Bar>;
 * ```
 *
 * @todo Rename to `KeyEnum<>`?
 */
export type StringEnum<E extends typeof Enum> = { [key in StringKeyOf<E>] : key };

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
export function getKeys<E extends typeof Enum> (e : E) : (StringKeyOf<E>)[] {
    return Object.keys(e)
        .filter<StringKeyOf<E>>((k) : k is StringKeyOf<E> => {
            return !/^\d/.test(k);
        });
}

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
export function isKey<E extends typeof Enum> (e : E, str : string) : str is StringKeyOf<E> {
    return isKeyInternal(getKeys(e), str);
}
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
export function toStringEnum<E extends typeof Enum> (e : E) : StringEnum<E> {
    return toStringEnumInternal(getKeys(e));
}
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
export function isValue<E extends typeof Enum> (e : E, mixed : any) : mixed is E[StringKeyOf<E>] {
    return isValueInternal(getValues(e), mixed);
}
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
export function extractValues<E extends typeof Enum> (e : E, arr : any[]) : (E[StringKeyOf<E>])[] {
    return extractValuesInternal(getValues(e), arr);
}
/**
 * Gets a key of a value.
 *
 * ```ts
 * enum Bar {
 *      X = "eks",
 *      Y = "wai",
 *      Z = "zee",
 * }
 * //"Y"
 * toKey(Bar, "wai");
 * ```
 *
 * @param e - The `enum` we are checking against
 * @param value - The value to convert to a key
 * @returns The key of the value
 */
export function toKey<E extends typeof Enum> (e : E, value : E[StringKeyOf<E>]) : StringKeyOf<E>;
export function toKey<E extends typeof Enum> (e : E, mixed : any) : (StringKeyOf<E>)|undefined;
export function toKey<E extends typeof Enum> (e : E, mixed : any) : (StringKeyOf<E>)|undefined {
    return toKeyInternal(e, getKeys(e), mixed);
}
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
export function getKeyCount<E extends typeof Enum> (e : E) : number {
    return getKeys(e).length;
}

export class WrappedEnum<E extends typeof Enum> {
    private readonly e : E;
    private readonly keys   : (StringKeyOf<E>)[];
    private readonly values : (E[StringKeyOf<E>])[];
    /**
     * @param e - The `enum` to wrap
     */
    public constructor (e : E) {
        this.e = e;
        this.keys   = getKeys(e);
        this.values = getValues(e);
    }
    /**
     * Returns the original, unwrapped `enum`.
     */
    public getEnum () {
        return this.e;
    }
    /**
     * Gets the keys of the `enum`.
     */
    public getKeys () {
        return [...this.keys];
    }
    /**
     * Gets the values of the `enum`.
     */
    public getValues () {
        return [...this.values];
    }
    /**
     * Tells you if the `string` is a key of the `enum`.
     *
     * @param str - The `string` that may or may not be a key of the `enum`
     * @returns A type guard boolean that tells you if `str` is a key of `enum`
     */
    public isKey (str : string) : str is StringKeyOf<E> {
        return isKeyInternal(this.keys, str);
    }
    /**
     * Converts an `enum` of type `key => value` into
     * an `enum` of type `key => key`.
     *
     * @todo Rename to `toKeyEnum<>()`?
     */
    public toStringEnum () : StringEnum<E> {
        return toStringEnumInternal(this.keys);
    }
    /**
     * Tells you if `mixed` is a value of the `enum`.
     *
     * @param mixed - The `mixed` value that may or may not be a value of the `enum`
     * @returns A type guard boolean that tells you if `mixed` is a value of `enum`
     */
    public isValue (mixed : any) : mixed is E[StringKeyOf<E>] {
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
    public extractValues (arr : any[]) : (E[StringKeyOf<E>])[] {
        return extractValuesInternal(this.values, arr);
    }
    /**
     * Gets a key of a value.
     *
     * @param value - The value to convert to a key
     * @returns The key of the value
     */
    public toKey (value : E[StringKeyOf<E>]) : StringKeyOf<E>;
    public toKey (mixed : any) : (StringKeyOf<E>)|undefined;
    public toKey (mixed : any) : (StringKeyOf<E>)|undefined {
        return toKeyInternal(this.e, this.keys, mixed);
    }
    /**
     * Counts the number of elements of an `enum`.
     *
     * @returns The number of elements in the `enum`
     */
    public getKeyCount () : number {
        return this.keys.length;
    }
}
