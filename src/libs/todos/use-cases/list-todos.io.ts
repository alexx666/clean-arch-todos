import Input from "../../core/input";
import Output from "../../core/output";
import Todo from "../entities/todo.entity";

export interface FindInput extends Input {
    limit: number
}

export interface FindOutput extends Output {
    todos: Todo[];
}