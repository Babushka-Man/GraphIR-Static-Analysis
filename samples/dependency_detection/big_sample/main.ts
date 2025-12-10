// ------------------------------
// Source + Sink
// ------------------------------
export function getUserInput(): string {
    return "user_input";
}

export function sendToSink(a: string, b: string, c: string) {
    console.log("sink:", a, b, c);
}

// ------------------------------
// Helpers
// ------------------------------
function wrap(v: string) {
    return { value: v };
}

function pickFirst(arr: string[]) {
    return arr[0];
}

function maybeTransform(v: string) {
    return v.includes("x") ? 'x_' + v : v;
}

// ------------------------------
// THE ONE BIG TEST
// ------------------------------
export function testMegaFlow() {
    // Direct source
    const src = getUserInput();

    // Aliasing
    const alias2 = src;

    // Wrapped inside object
    const wrapped = wrap(alias2);

    // Object mutation
    wrapped.value = wrapped.value + "_mutated";

    // Array propagation
    const arr = [wrapped.value, "static"];
    const arrPicked = pickFirst(arr);
    
    // Array mutation (push)
    const arr2 = ["safe"];
    arr2.push(getUserInput());

    // Conditional transform
    const var3 = getUserInput();
    const maybe = maybeTransform(var3);

    // Reassignment chain
    let chain = maybe;
    chain = chain + "_extended";

    // Map callback transformation
    const mapped = arr2.map(x => x + "_mapped")[0];

    // final sink
    sendToSink(mapped, arr2[1], var3);
}
