import { Method, Request, RequestBuilder } from "../../../ports";

import { ClientConfig } from "../config";

export class HTTPRequestBuilder implements RequestBuilder {

	constructor(private readonly config: ClientConfig) { }

	public setPath(url: string): RequestBuilder {
		return this;
	}
	public setMethod(method: Method): RequestBuilder {
		return this;
	}
	public setHeader(key: string, value: string): RequestBuilder {
		return this;
	}
	public setBody(body: string): RequestBuilder {
		return this;
	}
	public build(): Request {
		throw new Error("Not implemented yet!");
	}

}
