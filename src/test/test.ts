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
tape("typed-values", (t) => {
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
        enumUtil.getNumberValues(Foo),
        [0, 1, 2]
    );
    t.deepEquals(
        enumUtil.getStringValues(Bar),
        ["b", "d", "f"]
    );
    t.deepEquals(
        enumUtil.getNumberValues(Baz),
        [0, 2, 4]
    );
    try {
        t.deepEquals(
            enumUtil.getStringValues(Foo),
            [0, 1, 2]
        );
    } catch (err) {
        t.pass(err.message);
    }
    try {
        t.deepEquals(
            enumUtil.getNumberValues(Bar),
            ["b", "d", "f"]
        );
    } catch (err) {
        t.pass(err.message);
    }
    try {
        t.deepEquals(
            enumUtil.getStringValues(Baz),
            [0, 2, 4]
        );
    } catch (err) {
        t.pass(err.message);
    }
    t.end();
});
