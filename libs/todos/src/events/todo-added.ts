import { Todo } from "../entities";

import Event from "./event";

export default class TodoAdded implements Event<Todo> {

    public readonly type: string = "TodoAdded";
    public readonly details: Todo;
    public readonly id: string;
    public readonly timestamp: number = Date.now();

    constructor(todo: Todo) {
        this.details = todo;
        this.id = todo.id;
    }

}