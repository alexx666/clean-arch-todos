import { CreateTodoHandler } from "@todos/core";

import { createTodo } from "../../../controllers";

import { dynamoListRepo, cryptoUuid, snsMediator } from "../../data-access";

const createTodoInteractor = new CreateTodoHandler(dynamoListRepo, cryptoUuid, snsMediator);

export const handler = createTodo(createTodoInteractor);
