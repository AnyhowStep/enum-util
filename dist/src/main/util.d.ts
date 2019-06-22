export declare enum Enum {
}
export declare type StringKeyOf<T> = Extract<keyof T, string>;
export declare type StringEnum<E extends typeof Enum> = {
    [key in StringKeyOf<E>]: key;
};
export declare function getKeys<E extends typeof Enum>(e: E): (StringKeyOf<E>)[];
export declare function getValues<E extends typeof Enum>(e: E): (E[StringKeyOf<E>])[];
export declare function isKey<E extends typeof Enum>(e: E, str: string): str is StringKeyOf<E>;
export declare function toStringEnum<E extends typeof Enum>(e: E): StringEnum<E>;
export declare function isValue<E extends typeof Enum>(e: E, mixed: any): mixed is E[StringKeyOf<E>];
export declare function extractValues<E extends typeof Enum>(e: E, arr: any[]): (E[StringKeyOf<E>])[];
export declare function toKey<E extends typeof Enum, V extends number | string>(e: E, value: V): ({
    [key in StringKeyOf<E>]: (E[key] extends V ? key : never);
}[StringKeyOf<E>]);
export declare function toKey<E extends typeof Enum, K extends StringKeyOf<E>>(e: E, value: E[K]): K;
export declare function toKey<E extends typeof Enum>(e: E, value: E[StringKeyOf<E>]): StringKeyOf<E>;
export declare function toKey<E extends typeof Enum>(e: E, mixed: any): (StringKeyOf<E>) | undefined;
export declare function getKeyCount<E extends typeof Enum>(e: E): number;
export declare class WrappedEnum<E extends typeof Enum> {
    private readonly e;
    private readonly keys;
    private readonly values;
    constructor(e: E);
    getEnum(): E;
    getKeys(): Extract<keyof E, string>[];
    getValues(): E[Extract<keyof E, string>][];
    isKey(str: string): str is StringKeyOf<E>;
    toStringEnum(): StringEnum<E>;
    isValue(mixed: any): mixed is E[StringKeyOf<E>];
    extractValues(arr: any[]): (E[StringKeyOf<E>])[];
    toKey<V extends number | string>(mixed: V): ({
        [key in StringKeyOf<E>]: (E[key] extends V ? key : never);
    }[StringKeyOf<E>]);
    toKey<K extends StringKeyOf<E>>(mixed: E[K]): K;
    toKey(mixed: E[StringKeyOf<E>]): StringKeyOf<E>;
    toKey(mixed: any): (StringKeyOf<E>) | undefined;
    getKeyCount(): number;
}
