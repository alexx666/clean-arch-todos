import InputPort from "../../../libs/do/input.port";

export default class CLIController {
    constructor(private useCase: InputPort) {}

    async doSomething(cmd: any) {
        await this.useCase.doSomething({ limit: cmd.limit });
    }
}