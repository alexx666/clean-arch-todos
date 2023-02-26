import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { DeleteTodoHandler } from "../../../application";
import { DeleteTodoController } from "../../../controllers";
import { cryptoUuid, dynamoListRepo, snsMediator } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const interactor = new DeleteTodoHandler(snsMediator, dynamoListRepo, cryptoUuid);
const idempotentInterractor = new IdempotentCommandHandler(interactor, defaultIdempotencyConfig);
const controller = new DeleteTodoController(idempotentInterractor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
