import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";

import { CreateTodo, CreateTodoParameters, Mediator } from "@alexx666/todos-core";

export default (mediator: Mediator): Handler =>
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		console.debug("Event:", event);

		const response: Partial<APIGatewayProxyResult> = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Headers":
					"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
				"Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		};

		try {
			const { body, pathParameters: params } = event;

			if (!body) throw new Error("Request has no body!");
			if (!params?.listId) throw new Error("Request has no path parameters!");

			const request = {
				...JSON.parse(body),
				listName: decodeURI(params.listId),
			} as CreateTodoParameters;

			const result = await mediator.send(new CreateTodo(request));

			response.body = JSON.stringify(result);
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
