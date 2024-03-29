import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
	DeleteTodo,
	IDeleteTodoHandler,
} from "@todos/core";

import headers from "./cors-headers.json";

export class DeleteTodoController {
	constructor(private interactor: IDeleteTodoHandler) { }

	public async handle(
		event: APIGatewayProxyEvent
	): Promise<APIGatewayProxyResult> {
		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 204,
			body: "",
			headers,
		};

		try {
			const { pathParameters: params } = event;

			const requestIdHeader = String(process.env.REQUEST_ID_HEADER);
			const requestId = event.headers[requestIdHeader];

			if (!params?.listId || !params?.todoId) throw new Error("Request has no path parameters!");
			if (!requestId) throw new Error(`${requestIdHeader} not provided`);

			const request = new DeleteTodo(requestId, {
				listId: params.listId,
				id: params.todoId,
			});

			await this.interactor.execute(request);
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
