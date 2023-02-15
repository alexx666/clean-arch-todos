import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
} from "aws-lambda";

import { DeleteTodo, DeleteTodoParameters, IDeleteTodoHandler, idempotent } from "@todos/core";

import { headers, defaultIdempotencyConfig } from "../infrastructure/util";


export class DeleteTodoController {

	constructor(private interactor: IDeleteTodoHandler) { }

	@idempotent(defaultIdempotencyConfig)
	public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
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

			const request: DeleteTodoParameters = {
				listName: params.listId,
				id: params.todoId,
			};

			await this.interactor.execute(new DeleteTodo(request));
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
