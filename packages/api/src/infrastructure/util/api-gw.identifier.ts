import { IdentityProvider } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

export class APIGatewayIdentifier implements IdentityProvider {

	constructor(private readonly headerKey: string) { }

	public getIdentity(event: APIGatewayProxyEvent): string {
		const { headers } = event;

		const requestId = headers[this.headerKey];

		if (!requestId) throw new Error("Request ID not provided!");

		return requestId;
	}
}
