import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import {
	request as httpRequest,
	RequestOptions as HttpRequestOptions,
} from "http";
import {
	request as httpsRequest,
	RequestOptions as HttpsRequestOptions,
} from "https";
import { URL } from "url";

import { Method, Request } from "../../../ports";
import { HTTPError } from "./http.error";

export interface Headers {
	[key: string]: string | number;
}

interface RequestParameters {
	url: string;
	method: Method;
	body?: string | Buffer;
	headers?: Headers;
}

enum Protocols {
	HTTP = "http:",
	HTTPS = "https:",
}

export class HTTPRequest implements Request {
	private static errorRegex = /^(4|5)[\d]{2}$/;

	private readonly options: HttpRequestOptions | HttpsRequestOptions;
	private readonly body?: string | Buffer;
	private protocol: Protocols;

	constructor(options: RequestParameters) {

		const requestIdHeader = String(process.env.REQUEST_ID_HEADER ?? "X-Request-Id");
		const urlParams = new URL(options.url);

		this.protocol = urlParams.protocol as Protocols;

		this.options = {
			host: urlParams.hostname,
			port: urlParams.port,
			method: options.method,
			path: urlParams.pathname,
			headers: {
				"Content-Type": "application/json",
				...(options.headers ?? {}),
			},
		};

		this.body = options.body;
	}

	public get protocolBasedRequest() {
		switch (this.protocol) {
			case Protocols.HTTPS:
				return httpsRequest;
			case Protocols.HTTP:
				return httpRequest;
			default:
				throw new Error(`Unsupported protocol`);
		}
	}

	public send<O>(): Promise<O> {
		return new Promise((resolve, reject) => {
			const handler = (res: IncomingMessage) => {
				const isError = HTTPRequest.errorRegex.test(String(res.statusCode));

				res.setEncoding("utf8");

				res.on("data", (data: string) =>
					isError
						? reject(new HTTPError(Number(res.statusCode), data))
						: resolve(JSON.parse(data) as O)
				);

				res.on("error", (error) => reject(error.message));
			};

			const req = this.protocolBasedRequest(this.options, handler);

			req.on("error", (error) => reject(error.message));

			if (this.body) req.write(this.body);

			console.log(
				"Sending request",
				JSON.stringify({ ...this.options, body: this.body }, null, 2)
			);

			req.end();
		});
	}
}
