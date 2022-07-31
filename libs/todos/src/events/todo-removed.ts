import { Todo } from "../entities";

import { DomainEvent } from "./event";

export class TodoRemoved implements DomainEvent<Todo> {

    public readonly type: string = "TodoRemoved";
    public readonly details: Todo;
    public readonly timestamp: number = Date.now();
    public readonly stream: string;

    constructor(todo: Todo) {
        this.stream = `List:${todo.listName}`;
        this.details = todo;
    }

}