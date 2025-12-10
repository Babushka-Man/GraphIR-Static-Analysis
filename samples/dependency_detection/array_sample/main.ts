// Source
export function getUserInput(): string {
    return "user_input";
}

// Regular helper
export function pickFirst(arr: string[]): string {
    return arr[0];
}

// Sink (2 params)
export function sendToSink(a: string, b: string) {
    console.log("sink:", a, b);
}

// Only the requested test
export function testArrayFlow() {
    const wrapped = { value: getUserInput() };

    const arr = [wrapped.value, "string"];
    const picked = pickFirst(arr);

    sendToSink(picked, wrapped.value);
}
