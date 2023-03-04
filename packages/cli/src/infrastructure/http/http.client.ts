import { RequestBuilder, RequestClient } from "../../ports";
import { HTTPRequestBuilder } from "./http.builder";
import { ClientConfig } from "./http.config";

export class HTTPClient implements RequestClient {

	constructor(private readonly config: ClientConfig) { }

	getBuilder(): RequestBuilder {
		return new HTTPRequestBuilder(this.config);
	}

}
