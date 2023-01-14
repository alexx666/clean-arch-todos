import { DynamoListTodos } from "@todos/core";

import { listTodos } from "../../../controllers";

const interactor = new DynamoListTodos({
	table: String(process.env.DYNAMO_TABLE_NAME),
	endpoint: process.env.DYNAMODB_ENDPOINT,
	sslEnabled: process.env.DYNAMODB_ENDPOINT === undefined,
});

export const handler = listTodos(interactor);
