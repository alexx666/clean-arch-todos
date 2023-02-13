import { RetryDecider } from "./decider";

export class HTTPDecider implements RetryDecider {

	// TODO: implement decider
	public notRetryable(error: Error): boolean {
		return false;
	}

}
