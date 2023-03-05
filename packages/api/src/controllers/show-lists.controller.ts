import { IShowLists } from "@todos/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import headers from "./cors-headers.json";

export class ShowListsController {
	constructor(private interactor: IShowLists) { }

	public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 200,
			body: "",
			headers,
		};

		try {
			const result = await this.interactor.execute();

			response.body = JSON.stringify(result);
		} catch (error) {
			console.error(error);

			response.statusCode = 500; // FIXME: better error handling
			response.body = JSON.stringify({
				error: (error as Error).message,
			});
		}

		return response;
	}
}
