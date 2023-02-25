import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
	DeleteTodo,
	IDeleteTodoHandler,
} from "@todos/core";

import { headers } from "../infrastructure/util";

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

			if (!params?.listId || !params?.todoId)
				throw new Error("Request has no path parameters!");

			const request = new DeleteTodo({
				listName: params.listId,
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
