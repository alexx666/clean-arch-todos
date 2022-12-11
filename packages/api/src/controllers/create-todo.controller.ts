import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";

import headers from "./cors-headers";

import { CreateTodo, CreateTodoParameters, ICreateTodoHandler } from "@todos/core";

export default (interactor: ICreateTodoHandler): Handler =>
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 200,
			headers,
			body: "",
		};

		try {
			const { body, pathParameters: params } = event;

			if (!body) throw new Error("Request has no body!");
			if (!params?.listId) throw new Error("Request has no path parameters!");

			const request = {
				...JSON.parse(body),
				listName: decodeURI(params.listId),
			} as CreateTodoParameters;

			const result = await interactor.execute(new CreateTodo(request));

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
	};
