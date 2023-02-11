import { DeleteTodoHandler } from "@todos/core";

import { deleteTodo } from "../../../controllers";

import { dynamoListRepo, snsMediator } from "../../data-access";


const deleteTodoInterator = new DeleteTodoHandler(snsMediator, dynamoListRepo);

export const handler = deleteTodo(deleteTodoInterator);
