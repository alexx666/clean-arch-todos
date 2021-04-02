import InputPort from "../../../libs/do/input.port";

export default class CLIController {
    constructor(private useCase: InputPort) {}

    async doSomething(cmd: any) {
        const params = cmd; // plus further mapping
        await this.useCase.doSomething(params);
    }
}