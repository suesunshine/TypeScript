// @strictNullChecks: true
// @lib: esnext,dom

function test(required1: () => boolean, required2: () => boolean, optional?: () => boolean) {
    // error
    required1 && console.log('required');

    // error
    1 && required1 && console.log('required');

    // ok
    required1 && required1();

    // ok
    required1 && 1 && required1();

    // ok
    optional && console.log('optional');

    // ok
    1 && optional && console.log('optional');

    // ok
    !!required1 && console.log('not required');

    // ok
    required1() && console.log('required call');

    // ok
    required1 && required2 && required1() && required2();

    // error
    required1 && required2 && required1() && console.log('foo');
}

function checksConsole() {
    // error
    typeof window !== 'undefined' && window.console &&
        ((window.console as any).firebug || (window.console.exception && window.console.table));
}

function checksPropertyAccess() {
    const x = {
        foo: {
            bar() { return true; }
        }
    }

    // error
    x.foo.bar && console.log('x.foo.bar');

    // error
    1 && x.foo.bar && console.log('x.foo.bar');

    // ok
    x.foo.bar && x.foo.bar();

    // ok
    x.foo.bar && 1 && x.foo.bar();
}

class Foo {
    optional?: () => boolean;
    required() {
        return true;
    }
    test() {
        // error
        this.required && console.log('required');

        // error
        1 && this.required && console.log('required');

        // ok
        this.required && this.required();

        // ok
        this.required && 1 && this.required();

        // ok
        1 && this.optional && console.log('optional');
    }
}
