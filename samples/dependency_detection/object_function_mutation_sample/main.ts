export function getUserInput() {
    return "user_input";
}

export function sendToSink(a: string, b: string) {}

export function testArrayPush() {
    const arr: string[] = [];
    arr.push(getUserInput());
    sendToSink(arr[0], "array-push");
}
