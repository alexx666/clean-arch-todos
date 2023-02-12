import { SQSEvent } from "aws-lambda";

import { StoreEventController } from "../../../controllers";
import { StoreEventHandler } from "../../../application";
import { repository } from "../../data-access";

const interactor = new StoreEventHandler(repository);

export const handler = async (event: SQSEvent) => new StoreEventController(interactor).handle(event);
