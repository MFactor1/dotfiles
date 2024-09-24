const std = @import("std");

// zig fmt: off
test "foo bar" {
    std.debug.print("foo", .{});
}
 
// zig fmt: on

// test "foo bar" {
//     return error.Foo;
// }
const a = error.foo;

const Aaba = 1;
const @"{": c_char = 1;
fn @"{}"() void {
    .b;
}
/// foo bar
const U = enum { a, b, @"{", @"foo bar" };

const Foo = struct {
    fn add(foo: Foo) Foo {
        return foo;
    }
    fn remove(foo: Foo) Foo {
        return foo;
    }
    fn process(foo: Foo) Foo {
        return foo;
    }
    fn finalize(_: Foo) void {}
};
test {
    var builder = Foo{};
    // go to definition works on all of these calls:
    builder.add().remove().process().finalize();
    // but not on any of these calls:
    builder
        .add()
        .remove()
        .process()
        .finalize();
}
var bar: [*c]const u8 = "hello\n\t" + 1;

// <= and
