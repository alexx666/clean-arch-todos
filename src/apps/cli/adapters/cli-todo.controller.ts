import Interactor from "../../../libs/core/interactor";

export default class CLITodoController {
    constructor(private useCase: Interactor) {}

    list(cmd: any) {
        this.useCase.execute({ limit: cmd.limit })
    }
}