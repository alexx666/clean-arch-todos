import {
	DeleteTodoHandler,
	DynamoEventPublisher,
	DynamoListRepository,
} from "@alexx666/todos-core";

import createHandler from "./controller";

const useCase = new DeleteTodoHandler(new DynamoEventPublisher(), new DynamoListRepository());

export const handler = createHandler(useCase);
