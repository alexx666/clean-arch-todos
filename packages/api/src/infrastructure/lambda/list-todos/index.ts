import { listTodos } from "../../../controllers";

import { interactor } from "../../data-access";


export const handler = listTodos(interactor);
