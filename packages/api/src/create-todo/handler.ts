import {
	CreateTodoHandler,
	CryptoUuid,
	DynamoEventPublisher,
	DynamoListRepository,
} from "@alexx666/todos-core";

import createHandler from "./controller";

const useCase = new CreateTodoHandler(new DynamoListRepository(), new CryptoUuid(), new DynamoEventPublisher());

export const handler = createHandler(useCase);
