import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
	CreateTodo,
	ICreateTodoHandler,
} from "@todos/core";

import headers from "./cors-headers.json";

export class CreateTodoController {
	constructor(private interactor: ICreateTodoHandler) { }

	public async handle(
		event: APIGatewayProxyEvent
	): Promise<APIGatewayProxyResult> {
		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 200,
			headers,
			body: "",
		};

		try {
			const { body, pathParameters: params } = event;

			const requestIdHeader = String(process.env.REQUEST_ID_HEADER);
			const requestId = event.headers[requestIdHeader];

			if (!body) throw new Error("Request has no body!");
			if (!params?.listId) throw new Error("Request has no path parameters!");
			if (!requestId) throw new Error(`${requestIdHeader} not provided`);

			const request = new CreateTodo(requestId, {
				...JSON.parse(body),
				listName: decodeURI(params.listId),
			});

			const result = await this.interactor.execute(request);

			response.body = JSON.stringify(result);
		} catch (error) {
			console.error(error);

			response.statusCode = 500; // FIXME: better error handling
			response.body = JSON.stringify({
				error: (error as Error).message,
			});
		}

		console.debug("Response:", response);

		return response;
	}
}
