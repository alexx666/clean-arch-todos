import { DynamoListTodos } from "@todos/core";

import { listTodos } from "../../../controllers";

const interactor = new DynamoListTodos({
	table: String(process.env.DYNAMO_TABLE_NAME),
	endpoint: process.env.AWS_ENDPOINT_URL,
	sslEnabled: process.env.AWS_ENDPOINT_URL === undefined,
});

export const handler = listTodos(interactor);
