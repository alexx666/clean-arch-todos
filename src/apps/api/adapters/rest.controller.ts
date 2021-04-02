import InputPort from "../../../core/do/input.port";

export default class RESTController {
    constructor(private useCase: InputPort) {}

    async doSomething(request: any) {
        // TODO: map api request to use case input
        await this.useCase.doSomething();
    }
}