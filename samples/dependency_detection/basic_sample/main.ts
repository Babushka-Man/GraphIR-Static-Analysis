// Source: returns user-controlled data
export function getUserInput(): string {
    return "user_input";
}

// Regular function: does not act as a source or sink
export function formatValue(value: string): string {
    return 'formatted_' + value;
}

// Sink: accepts two parameters
export function sendToSink(param1: string, param2: string) {
    console.log("Sink called:", param1, param2);
}

// Example usage for testing
export function testFlow() {
    const input = getUserInput();
    const formatted = formatValue(input);
    sendToSink(input, formatted);
}
