import Todo from "../entities/todo.entity";
import InputPort from "./input.port";
import Repository from "./repository";
import Presenter from "./presenter";

export default class TodoService implements InputPort {

    constructor(private presenter: Presenter, private gateway: Repository<Todo>) {}

    async list(params: any) {
        try {
            const result = await this.gateway.find(params)
            this.presenter.present(result.map(i => i.toJSON()))
        } catch (error) {
            this.presenter.present(error.message)
        }
    }
}