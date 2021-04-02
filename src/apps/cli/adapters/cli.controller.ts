import InputPort from "../../../core/do/input.port";

export default class CLIController {
    constructor(private useCase: InputPort) {}

    async doSomething(cmd: any) {
        // TODO: map command to input to use case input
        await this.useCase.doSomething();
    }
}