import {
	CreateListHandler,
	DynamoEventPublisher,
	DynamoListRepository,
} from "@alexx666/todos-core";

import createHandler from "./controller";

const useCase = new CreateListHandler(new DynamoEventPublisher(), new DynamoListRepository());

export const handler = createHandler(useCase);
