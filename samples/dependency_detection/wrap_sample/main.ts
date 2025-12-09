// -------------------
// Source
// -------------------
export function getUserInput(): string {
    return "user_input";
}

// -------------------
// Regular helpers
// -------------------
export function wrap(v: string): { value: string } {
    return { value: v };
}

// -------------------
// Sink (2 params)
// -------------------
export function sendToSink(a: string, b: string) {
    console.log("sink:", a, b);
}

// -------------------
// Test flows
// -------------------
export function testFlows() {
    // Direct source value
    const raw = getUserInput();

    // Object propagation
    const wrapped = wrap(raw);

    // Nested call flow
    sendToSink("123", wrapped.value);
}
