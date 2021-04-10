import { Response } from "express";

import Presenter from "../../../libs/core/presenter";
import { FindOutput } from "../../../libs/todos/use-cases/list-todos.io";

export default class HTTPResponsePresenter implements Presenter<FindOutput, Error> {

    constructor(private response: Response) {}

    presentResult(result: FindOutput) {
        this.response.json(result)
    }

    // TODO: use error codes
    presentError(error: Error) {
        this.response.status(500).json({ message: error.message })
    }

}