import { DynamoListTodos } from "@todos/core";

import { listTodos } from "../../../controllers";

const interactor = new DynamoListTodos({
	table: String(process.env.DYNAMO_TABLE_NAME),
});

export const handler = listTodos(interactor);
