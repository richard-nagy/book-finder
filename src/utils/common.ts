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

export async function attemptFetch<T>(
    fn: () => Promise<T>,
    maxRetries: number,
    delayMs: number,
): Promise<T> {
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            lastError = error;

            if (attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            } else {
                throw lastError;
            }
        }
    }

    throw new Error("Failed after all retries.");
}
