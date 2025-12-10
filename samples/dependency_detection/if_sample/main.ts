// Source
export function getUserInput(): string {
    return "user_input";
}

// Sink (2 params)
export function sendToSink(a: string, b: string) {
    console.log("sink:", a, b);
}

// Only the requested test part
export function testEarlyReturnFlow() {
    const chain = getUserInput();

    if (chain.length > 0) {
        return sendToSink(chain, "early_return");
    }
}
