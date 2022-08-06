import { IncomingMessage } from "http";
import { request, RequestOptions } from "https";
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

export default class Request<TResponse> {
	private static errorRegex = /^(4|5)[\d]{2}$/;

	private readonly options: RequestOptions;
	private readonly body?: string | Buffer;

	constructor(options: RequestParameters) {
		const urlParams = new URL(options.url);

		this.options = {
			host: urlParams.hostname,
			port: urlParams.port,
			method: options.method,
			path: urlParams.pathname,
			headers: options.headers,
		};

		this.body = options.body;
	}

	public send(): Promise<TResponse> {
		return new Promise((resolve, reject) => {
			const handler = (res: IncomingMessage) => {
				const isError = Request.errorRegex.test(String(res.statusCode));

				res.setEncoding("utf8");

				res.on("data", (data) =>
					isError
						? reject(new Error(JSON.parse(data).error))
						: resolve(JSON.parse(data))
				);

				res.on("error", reject);
			};

			const req = request(this.options, handler);

			req.on("error", reject);

			if (this.body) req.write(this.body);

			req.end();
		});
	}
}
