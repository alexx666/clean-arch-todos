import { CreateListHandler, CREATE_LIST, InMemoryMediator, InMemoryTodoRepository } from "@alexx666/todos-core";

import createHandler from "./controller";

const di = new Map();

const mediator = new InMemoryMediator(di);

di.set(CREATE_LIST, new CreateListHandler(mediator, new InMemoryTodoRepository()));

export const handler = createHandler(mediator);
