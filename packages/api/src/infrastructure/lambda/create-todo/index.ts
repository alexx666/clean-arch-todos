import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateTodoHandler } from "../../../application";
import { CreateTodoController } from "../../../controllers";
import { dynamoListRepo, cryptoUuid, snsMediator } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const interactor = new CreateTodoHandler(dynamoListRepo, cryptoUuid, snsMediator);
const idempotentInteractor = new IdempotentCommandHandler(interactor, defaultIdempotencyConfig);
const controller = new CreateTodoController(idempotentInteractor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
