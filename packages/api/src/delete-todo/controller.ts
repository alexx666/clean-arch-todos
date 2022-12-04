import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";

import { DeleteTodo, DeleteTodoParameters, IMediator } from "@todos/core";

export default (mediator: IMediator): Handler =>
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		console.debug("Event:", event);

		const response: Partial<APIGatewayProxyResult> = {
			statusCode: 204,
			body: "",
			headers: {
				"Access-Control-Allow-Headers":
					"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
				"Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		};

		try {
			const { pathParameters: params } = event;

			if (!params?.listId || !params?.todoId)
				throw new Error("Request has no path parameters!");

			const request: DeleteTodoParameters = {
				listName: params.listId,
				id: params.todoId,
			};

			await mediator.send(new DeleteTodo(request));
		} catch (error) {
			console.error(error);

			response.statusCode = 500; // FIXME: better error handling
			response.body = JSON.stringify({
				error: (error as Error).message,
			});
		}

		console.debug("Response:", response);

		return response as APIGatewayProxyResult;
	};
