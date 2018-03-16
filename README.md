# `enum-util`

Only works with TypeScript enums.

Use this to get keys, and values of your enums during run-time.

# Installation

```bash
npm install --save enum-util
```

# Usage

```typescript
import * as enumUtil from "enum-util";
enum Bar {
    B = "b",
    D = "d",
    F = "f"
}
enumUtil.getKeys(Bar); // ["B", "D", "F"]
enumUtil.getValues(Bar); // ["b", "d", "f"]
enumUtil.extractValues(Bar, ["B", "b", "D", "d", "F", "f"]); // ["b", "d", "f"]

enumUtil.toEnumValue( "b", Bar ); // Bar.B
enumUtil.toEnumValue( "x", Bar ); // undefined
```

# License

Do what you want with this as long as you do no evil.
