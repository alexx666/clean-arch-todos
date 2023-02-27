import { join } from "path";

import { Method, Request, RequestBuilder } from "../../../ports";
import { ClientConfig } from "../config";
import { HTTPRequest, Headers } from "./http.request";

export class HTTPRequestBuilder implements RequestBuilder {

	private url: string;
	private method: Method | undefined;
	private headers: Headers = {};
	private body: string | undefined;

	constructor(private readonly config: ClientConfig) {
		this.url = this.config.apiUrl;
	}

	public setPath(path: string): RequestBuilder {
		this.url = join(this.url, path);
		return this;
	}
	public setMethod(method: Method): RequestBuilder {
		this.method = method;
		return this;
	}
	public setHeader(key: string, value: string): RequestBuilder {
		this.headers[key] = value;
		return this;
	}
	public setBody(body: string): RequestBuilder {
		this.body = body;
		return this;
	}
	public build(): Request {
		if (!this.method) throw new Error("HTTP verb provided!");

		const request = new HTTPRequest({
			url: this.url,
			method: this.method,
			headers: this.headers,
			body: this.body,
		});

		return request;
	}

}
