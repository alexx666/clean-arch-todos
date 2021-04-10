import Todo from "../../entities/todo.entity";

export interface ListTodosInput {
    limit: number
}

export interface ListTodosOutput {
    items: Todo[];
    count: number;
}