import { ClientRequest, IncomingMessage, RequestOptions } from "http";

import { Todo, TodoGateway } from "../todos/entities/todo";

export default class RestTodoGateway implements TodoGateway {

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