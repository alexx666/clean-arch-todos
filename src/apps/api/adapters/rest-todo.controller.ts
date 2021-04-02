import InputPort from "../../../libs/todos/use-cases/input.port";

export default class RESTTodoController {
    constructor(private useCase: InputPort) {}

    async list(request: any) {
        await this.useCase.list(request.query);
    }
}