/**
 * Tests the provided string and returns true if the tested string is empty.
 * @param value The string we want to test.
 * @returns Returns true if the tested string is empty.
 */
export function isStringEmpty(value: string | undefined | null): boolean {
    if (typeof value !== "string") {
        return true;
    }

    const whitespaceRegex = /^\s*$/;
    return whitespaceRegex.test(value);
}
