import Some from "./some.entity";
import InputPort from "./input.port";
import Repository from "./repository";
import Presenter from "./presenter";

export default class DoSomething implements InputPort {

    constructor(private presenter: Presenter, private gateway: Repository<Some>) {}

    async doSomething() {
        try {
            const result = await this.gateway.find()
            this.presenter.present(result)
        } catch (error) {
            this.presenter.present(error.message)
        }
    }
}