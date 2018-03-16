export enum Enum {
}

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

export function toEnumValue<E extends typeof Enum> (val: any, e : E) : E[keyof E] | undefined {
    return getValues( e ).find( v => v === val );
}

function isKeyInternal<E extends typeof Enum> (keys : (keyof E)[], str : string) : str is keyof E {
    return keys.indexOf(str as any) >= 0;
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

export function isKey<E extends typeof Enum> (e : E, str : string) : str is keyof E {
    return isKeyInternal(getKeys(e), str);
}
//Only string|number are allowed to be enum values
export function isValue<E extends typeof Enum> (e : E, mixed : any) : mixed is E[keyof E] {
    return isValueInternal(getValues(e), mixed);
}
export function extractValues<E extends typeof Enum> (e : E, arr : any[]) : (E[keyof E])[] {
    return extractValuesInternal(getValues(e), arr);
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
    public isValue (mixed : any) : mixed is E[keyof E] {
        return isValueInternal(this.keys, mixed);
    }
    public extractValues (arr : any[]) : (E[keyof E])[] {
        return extractValuesInternal(this.values, arr);
    }
}
