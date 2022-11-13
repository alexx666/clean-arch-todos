import { DeleteTodoHandler, DELETE_TODO, InMemoryMediator, InMemoryTodoRepository } from "@alexx666/todos-core";

import createHandler from "./controller";

const di = new Map();

const mediator = new InMemoryMediator(di);

di.set(DELETE_TODO, new DeleteTodoHandler(mediator, new InMemoryTodoRepository()));

export const handler = createHandler(mediator);
