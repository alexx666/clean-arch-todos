import { BackoffStrategy } from "./backoff";

export class ExponentialBackoff implements BackoffStrategy {

	public next(retries: number, initialBackoff: number): number {
		const timeCap = 10 * 1000;
		const min = 0;
		const max = Math.min(timeCap, Math.pow(2, retries) * initialBackoff);

		return Math.floor(Math.random() * (max - min + 1) + min)
	}
}
