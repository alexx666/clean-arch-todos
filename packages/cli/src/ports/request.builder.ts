import { Request } from "./request";

export type Method = "POST" | "PUT" | "OPTIONS" | "DELETE" | "GET";

export interface RequestBuilder {
	setPath(url: string): RequestBuilder;
	setMethod(method: Method): RequestBuilder;
	setHeader(key: string, value: string): RequestBuilder;
	setBody(body: string): RequestBuilder;
	build(): Request;
}
