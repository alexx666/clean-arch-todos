import InputPort from "../../../libs/todos/use-cases/input.port";

export default class CLITodoController {
    constructor(private useCase: InputPort) {}

    async list(cmd: any) {
        await this.useCase.list({ limit: cmd.limit });
    }
}