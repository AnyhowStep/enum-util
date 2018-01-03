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
```

# License

Do what you want with this as long as you do no evil.
