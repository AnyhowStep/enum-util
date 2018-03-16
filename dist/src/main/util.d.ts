export declare enum Enum {
}
export declare function getKeys<E extends typeof Enum>(e: E): (keyof E)[];
export declare function getValues<E extends typeof Enum>(e: E): (E[keyof E])[];
export declare function toEnumValue<E extends typeof Enum>(val: any, e: E): E | undefined;
export declare function isKey<E extends typeof Enum>(e: E, str: string): str is keyof E;
export declare function isValue<E extends typeof Enum>(e: E, mixed: any): mixed is E[keyof E];
export declare function extractValues<E extends typeof Enum>(e: E, arr: any[]): (E[keyof E])[];
export declare class WrappedEnum<E extends typeof Enum> {
    private readonly e;
    private readonly keys;
    private readonly values;
    constructor(e: E);
    getEnum(): E;
    getKeys(): (keyof E)[];
    getValues(): E[keyof E][];
    isKey(str: string): str is keyof E;
    isValue(mixed: any): mixed is E[keyof E];
    extractValues(arr: any[]): (E[keyof E])[];
}
