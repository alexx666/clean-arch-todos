import Entity from "../../entities/entity";
import InputPort from "./input.port";
import Repository from "./repository";
import Presenter from "./presenter";

export default class DoSomething implements InputPort {

    constructor(private presenter: Presenter, private gateway: Repository<Entity>) {}

    async doSomething(params: any) {
        const result = await this.gateway.find(params)
        this.presenter.present(result)
    }
}