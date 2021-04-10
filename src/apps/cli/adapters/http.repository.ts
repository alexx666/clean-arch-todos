import { ClientRequest, IncomingMessage, RequestOptions } from "http";

import Repository from "../../../core/repository";
import Todo from "../../../core/todos/entities/todo.entity";

export default class HTTPTodoRepository implements Repository<Todo> {

    async find(query: any): Promise<Todo[]> {
        const queryParams = Object.entries(query).map(e => e.join('=')).join('&')

        const options: RequestOptions = {
            host: String(process.env.HOST),
            port: Number(process.env.PORT),
            path: `/todos?${queryParams}`,
            method: "GET"
        }

        const response = await new Promise<IncomingMessage>((resolve, reject) => {
            const req = new ClientRequest(options);
            req.on("response", (message: IncomingMessage) => resolve(message))
            req.on("error", (error: Error) => reject(error))
            req.end()
        })

        const body = JSON.parse(response.read());

        return body.items.map((i: any) => new Todo(i.id));
    }
}