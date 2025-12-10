// -------------------
// Source
// -------------------
export function getUserInput(): string {
    return "user_input";
}

// -------------------
// Regular helper
// -------------------
export function maybeTransform(v: string): string {
    return v.includes("x") ? 'x_' + v : "x";
}

// -------------------
// Sink (2 params)
// -------------------
export function sendToSink(a: string, b: string) {
    console.log("sink:", a, b);
}

// -------------------
// Test flows (more advanced)
// -------------------
export function testMoreFlows() {
    const raw = getUserInput();

    // Conditional transformation
    const maybe = maybeTransform(raw);

    sendToSink(maybe, "fallback");
}
