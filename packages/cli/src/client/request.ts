import { IncomingMessage } from "http";
import { request as httpRequest, RequestOptions as HttpRequestOptions } from "http";
import { request as httpsRequest, RequestOptions as HttpsRequestOptions } from "https"
import { URL } from "url";

interface Headers {
	[key: string]: string | number;
}

interface RequestParameters {
	url: string;
	method: "POST" | "PUT" | "DELETE" | "GET";
	body?: string | Buffer;
	headers: Headers;
}

// FIXME: define as generic param in Request
interface ErrorMessage {
	error: string;
}

enum Protocols {
	HTTP = "http:",
	HTTPS = "https:",
}

export class Request<TResponse> {
	private static errorRegex = /^(4|5)[\d]{2}$/;

	private readonly options: HttpRequestOptions | HttpsRequestOptions;
	private readonly body?: string | Buffer;
	private protocol: Protocols;

	constructor(options: RequestParameters) {
		const urlParams = new URL(options.url);

		this.protocol = urlParams.protocol as Protocols;

		this.options = {
			host: urlParams.hostname,
			port: urlParams.port,
			method: options.method,
			path: urlParams.pathname,
			headers: options.headers,
		};

		this.body = options.body;
	}

	public get protocolBasedRequest() {
		switch (this.protocol) {
			case Protocols.HTTPS: return httpsRequest;
			case Protocols.HTTP: return httpRequest
			default: throw new Error(`Unsupported protocol`);
		}
	}

	public send(): Promise<TResponse> {
		return new Promise((resolve, reject) => {
			const handler = (res: IncomingMessage) => {
				const isError = Request.errorRegex.test(String(res.statusCode));

				res.setEncoding("utf8");

				res.on("data", (data: string) =>
					isError
						? reject(new Error((JSON.parse(data) as ErrorMessage).error))
						: resolve(JSON.parse(data) as TResponse)
				);

				res.on("error", reject);
			};

			const req = this.protocolBasedRequest(this.options, handler);

			req.on("error", reject);

			if (this.body) req.write(this.body);

			console.log("Sending request", JSON.stringify({ ...this.options, body: this.body }, null, 2));

			req.end();
		});
	}
}
