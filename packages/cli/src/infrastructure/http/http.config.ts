import { ExponentialBackoff } from "@todos/core";

import { HTTPDecider } from "./http.decider";

export interface ClientConfig {
	apiUrl: string;
}

export const defaultConfig: ClientConfig = {
	apiUrl: process.env.API_URL ?? "http://localhost:3000",
};

export const defaultOptions = {
	maxRetries: Number(process.env.MAX_RETRIES ?? 5),
	decider: new HTTPDecider(),
	backoffStrategy: new ExponentialBackoff(),
}
