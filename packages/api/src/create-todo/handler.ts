import { CreateTodoHandler, CREATE_TODO, CryptoUuid, InMemoryMediator, InMemoryTodoRepository } from "@alexx666/todos-core";

import createHandler from "./controller";

const di = new Map();

const mediator = new InMemoryMediator(di);

di.set(CREATE_TODO, new CreateTodoHandler(new InMemoryTodoRepository(), new CryptoUuid(), mediator));

export const handler = createHandler(mediator);
