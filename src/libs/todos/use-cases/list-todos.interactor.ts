import Todo from "../entities/todo.entity";
import Interactor from "../../core/interactor";
import Repository from "../../core/repository";
import Result from "../../core/result";
import Presenter from "../../core/presenter";

import { FindOutput, FindInput } from "./list-todos.io";

export default class ListTodos implements Interactor {

    constructor(private gateway: Repository<Todo>, private presenter?: Presenter<FindOutput, Error>) {}

    public execute(input: FindInput, _?: any): Result<FindOutput>;
    public execute(input: FindInput, callback: (error?: Error, output?: FindOutput) => void): void
    public execute(input: FindInput, callback: any): any {

        const findPromise: Promise<FindOutput> = this.gateway.find(input).then(todos => ({ todos }));

        if (this.presenter !== undefined) {
            findPromise
                .then(result => this.presenter?.presentResult(result))
                .catch(error => this.presenter?.presentError(error))
        }

        if(callback) {
            findPromise
                .then(result => callback(undefined, result))
                .catch(error => callback(error))
        } else {
            return new Result<FindOutput>(findPromise);
        }
    }

    subscribe(presenter: Presenter<FindOutput, Error>): void {
        this.presenter = presenter
    }
}