# `enum-util`

Only works with TypeScript enums.

Use this to get keys, and values of your enums during run-time.

# Installation

`npm install --save enum-util`

# Usage

```
import * as enumUtil from "enum-util";
enum Bar {
    B = "b",
    D = "d",
    F = "f"
}
enumUtil.getKeys(Bar); //["B", "D", "F"]
enumUtil.getValues(Bar); //["b", "d", "f"]
enumUtil.isKey(Bar, "B"); //true
enumUtil.isValue(Bar, "b"); //true
enumUtil.extractValues(Bar, ["B", "b", "D", "d", "F", "f"]); //["b", "d", "f"]
enumUtil.toKey(Bar, "b"); //"B"
enumUtil.getKeyCount(Bar); //3

enum Foo {
    A = 0,
    B = 1,
    C = 2,
}
enumUtil.toStringEnum(Foo); //{ A : "A", B : "B", C : "C" }
```

# License

Do what you want with this as long as you do no evil.
