import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
	CreateList,
	CreateListParameters,
	ICreateListHandler,
} from "@todos/core";

import { headers } from "../infrastructure/util";

export class CreateListController {
	constructor(private interactor: ICreateListHandler) { }

	public async handle(
		event: APIGatewayProxyEvent
	): Promise<APIGatewayProxyResult> {
		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 201,
			body: "",
			headers,
		};

		try {

			const requestIdHeader = String(process.env.REQUEST_ID_HEADER);
			const requestId = event.headers[requestIdHeader];

			if (!event.body) throw new Error("Request has no body!");
			if (!requestId) throw new Error(`${requestIdHeader} not provided`);

			const body = JSON.parse(event.body) as CreateListParameters;

			const request = new CreateList(requestId, {
				name: body.name,
				maxTodos: body.maxTodos ?? 10,
				allowDuplicates: body.allowDuplicates ?? false,
				allowExpired: body.allowExpired ?? true,
			});

			await this.interactor.execute(request);
		} catch (error) {
			console.error(error);

			response.statusCode = 500; // FIXME: better error handling
			response.body = JSON.stringify({
				error: (error as Error).message,
			});
		}

		console.debug("Returning response to client:", response);

		return response;
	}
}
