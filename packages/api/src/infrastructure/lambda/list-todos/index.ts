import { APIGatewayProxyEvent } from "aws-lambda";

import { ListTodosController } from "../../../controllers";
import { interactor } from "../../data-access";

export const handler = async (event: APIGatewayProxyEvent) =>
	new ListTodosController(interactor).handle(event);
