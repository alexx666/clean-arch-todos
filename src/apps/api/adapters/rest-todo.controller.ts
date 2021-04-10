import { Request } from "express";

import Interactor from "../../../libs/core/interactor";

export default class RESTTodoController {
    constructor(private useCase: Interactor) {}

    list(request: Request) {
        this.useCase.execute(request.query)
    }
}