import * as enumUtil from "../main/index";
import * as tape from "tape";

tape("keys", (t) => {
    enum Foo {
        A,
        C,
        E
    }
    enum Bar {
        B = "b",
        D = "d",
        F = "f"
    }
    enum Baz {
        G = 0,
        I = 2,
        K = 4
    }
    t.deepEquals(
        enumUtil.getKeys(Foo),
        ["A", "C", "E"]
    );
    t.deepEquals(
        enumUtil.getKeys(Bar),
        ["B", "D", "F"]
    );
    t.deepEquals(
        enumUtil.getKeys(Baz),
        ["G", "I", "K"]
    );
    t.end();
});
tape("values", (t) => {
    enum Foo {
        A,
        C,
        E
    }
    enum Bar {
        B = "b",
        D = "d",
        F = "f"
    }
    enum Baz {
        G = 0,
        I = 2,
        K = 4
    }
    t.deepEquals(
        enumUtil.getValues(Foo),
        [0, 1, 2]
    );
    t.deepEquals(
        enumUtil.getValues(Bar),
        ["b", "d", "f"]
    );
    t.deepEquals(
        enumUtil.getValues(Baz),
        [0, 2, 4]
    );
    t.end();
});
tape("isKey", (t) => {
    enum Foo {
        A,
        C,
        E
    }
    enum Bar {
        B = "b",
        D = "d",
        F = "f"
    }
    enum Baz {
        G = 0,
        I = 2,
        K = 4
    }
    t.deepEquals(
        enumUtil.isKey(Foo, "A"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "C"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "E"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "a"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "c"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "e"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "0"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "1"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Foo, "2"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Bar, "B"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Bar, "D"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Bar, "F"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Bar, "b"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Bar, "d"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Bar, "f"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Baz, "G"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Baz, "I"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Baz, "K"),
        true
    );
    t.deepEquals(
        enumUtil.isKey(Baz, "0"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Baz, "2"),
        false
    );
    t.deepEquals(
        enumUtil.isKey(Baz, "4"),
        false
    );
    t.end();
});
tape("isKey", (t) => {
    enum Foo {
        A,
        C,
        E
    }
    enum Bar {
        B = "b",
        D = "d",
        F = "f"
    }
    enum Baz {
        G = 0,
        I = 2,
        K = 4
    }
    t.deepEquals(
        enumUtil.isValue(Foo, 0),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Foo, 1),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Foo, 2),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Foo, "A"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Foo, "C"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Foo, "E"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Foo, "0"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Foo, "1"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Foo, "2"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Foo, 3),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Bar, "b"),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Bar, "d"),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Bar, "f"),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Bar, "B"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Bar, "D"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Bar, "F"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Baz, 0),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Baz, 2),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Baz, 4),
        true
    );
    t.deepEquals(
        enumUtil.isValue(Baz, 1),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Baz, 3),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Baz, 5),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Baz, "G"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Baz, "I"),
        false
    );
    t.deepEquals(
        enumUtil.isValue(Baz, "K"),
        false
    );
    t.end();
});
tape("extract-values", (t) => {
    enum Foo {
        A,
        C,
        E
    }
    enum Bar {
        B = "b",
        D = "d",
        F = "f"
    }
    enum Baz {
        G = 0,
        I = 2,
        K = 4
    }
    t.deepEquals(
        enumUtil.extractValues(Foo, ["A", 0, "0", "C", 1, "1", "E", 2, "2"]),
        [0, 1, 2]
    );
    t.deepEquals(
        enumUtil.extractValues(Bar, ["B", "b", "A", 0, "0", "D", "d", "C", 1, "1", "F", "f", "E", 2, "2"]),
        ["b", "d", "f"]
    );
    t.deepEquals(
        enumUtil.extractValues(Baz, ["G", "B", "b", "A", 0, "0", "I", "D", "d", "C", 1, "1", "F", "f", "E", 2, "2", 4, "4", "K"]),
        [0, 2, 4]
    );
    t.end();
});
