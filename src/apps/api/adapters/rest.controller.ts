import InputPort from "../../../libs/do/input.port";

export default class RESTController {
    constructor(private useCase: InputPort) {}

    async doSomething(request: any) {
        const params = request.params; // plus further mapping
        await this.useCase.doSomething(params);
    }
}