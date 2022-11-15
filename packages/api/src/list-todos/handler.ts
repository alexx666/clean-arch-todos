import { DynamoListTodos } from "@alexx666/todos-core";

import createHandler from "./controller";

const dynamoListTodos = new DynamoListTodos({
	table: String(process.env.DYNAMO_TABLE_NAME),
});

export const handler = createHandler(dynamoListTodos);
