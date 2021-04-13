import { NextFunction, Request, Response } from "express";
import { CreateTodo, CreateTodoRequest } from "../../modules/todos/boundry/create-todo";
import { DeleteTodo, DeleteTodoRequest } from "../../modules/todos/boundry/delete-todo";
import { ListTodos, ListTodosRequest } from "../../modules/todos/boundry/list-todos";


export default class TodoController {
    constructor(private listTodos: ListTodos, private createTodo: CreateTodo, private deleteTodo: DeleteTodo) {}

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ListTodosRequest = { limit: Number(req.query.limit) || 20 }

            const result = await this.listTodos.execute(request)

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateTodoRequest;

            const result = await this.createTodo.execute(request);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const request: DeleteTodoRequest = { id: req.params.id };

            const result = await this.deleteTodo.execute(request);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}