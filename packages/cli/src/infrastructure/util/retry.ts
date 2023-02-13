// TODO: Refactor to OOP
// FIXME: implement decider
function isNotRetryable(error: Error): boolean {
	return false;
}

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export const retryable = () => (_: any, __: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {
		const maxRetries = 5;
		const initialBackoff = 100;

		let shouldRetry = true;
		let retries = 0;

		do {
			try {
				await originalMethod.apply(this, args);
			} catch (error) {
				console.debug("Operation failed with error:", error);

				if (isNotRetryable(error as Error)) throw error;

				retries += 1;
				shouldRetry = retries < maxRetries;

				const backoff = Math.pow(2, retries) * initialBackoff; // exponencial

				console.debug("Retrying in:", backoff)

				await delay(backoff);

				console.debug("Retries left:", maxRetries - retries);
			}
		} while (shouldRetry);
	}
}
