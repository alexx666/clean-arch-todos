import { RetryDecider } from "./decider";
import { HTTPError } from "./http.error";

export class HTTPDecider implements RetryDecider<HTTPError> {

	constructor(private readonly retryableStatusCodesPattern = /^(?:429|[5][0-9][02356789])$/) { }

	public notRetryable(error: HTTPError): boolean {
		const isRetryable = this.retryableStatusCodesPattern.test(String(error.code));

		return !isRetryable;
	}

}
