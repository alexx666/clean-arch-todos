import { CreateListHandler } from "@todos/core";

import { createList } from "../../../controllers";
import { snsMediator, dynamoListRepo } from "../../data-access";

const createListInteractor = new CreateListHandler(snsMediator, dynamoListRepo)

export const handler = createList(createListInteractor);
