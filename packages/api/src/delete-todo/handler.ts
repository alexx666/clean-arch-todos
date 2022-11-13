import { DeleteTodoHandler, DELETE_TODO, InMemoryMediator, InMemoryListRepository, TodoRemovedHandler, TODO_REMOVED } from "@alexx666/todos-core";

import createHandler from "./controller";

const di = new Map();

const mediator = new InMemoryMediator(di);

di.set(DELETE_TODO, new DeleteTodoHandler(mediator, new InMemoryListRepository()));
di.set(TODO_REMOVED, new TodoRemovedHandler());

export const handler = createHandler(mediator);
