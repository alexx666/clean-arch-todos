import { DynamoListTodos } from "@alexx666/todos";

import createHandler from "./controller";

const useCase = new DynamoListTodos();

export const handler = createHandler(useCase);
