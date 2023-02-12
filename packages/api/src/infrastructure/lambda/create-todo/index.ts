import { CreateTodoHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateTodoController } from "../../../controllers";
import { dynamoListRepo, cryptoUuid, snsMediator } from "../../data-access";

const createTodoInteractor = new CreateTodoHandler(dynamoListRepo, cryptoUuid, snsMediator);

export const handler = async (event: APIGatewayProxyEvent) => new CreateTodoController(createTodoInteractor).handle(event);
