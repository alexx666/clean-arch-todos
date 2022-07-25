import { Todo } from "../entities";

import { Event } from "./event";

export class TodoRemoved implements Event<Todo> {

    public readonly type: string = "TodoRemoved";
    public readonly details: Todo;
    public readonly id: string;
    public readonly timestamp: number = Date.now();

    constructor(todo: Todo) {
        this.details = todo;
        this.id = todo.id;
    }

}