import { CreateTodo, CreateTodoRequest, CreateTodoResponse } from "../boundry/create-todo";

export default class CreateTodoMock implements CreateTodo {
    execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {
        throw new Error("Method not implemented.");
    }
}