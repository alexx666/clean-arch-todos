import InputPort from "../../../core/do/input.port";

export default class RESTController {
    constructor(private useCase: InputPort) {}

    async doSomething(request: any) {
        await this.useCase.doSomething(request.query);
    }
}