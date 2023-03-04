import { RequestBuilder } from "./request.builder";

export interface RequestClient {
	getBuilder(): RequestBuilder;
}
