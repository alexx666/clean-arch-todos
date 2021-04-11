import { ClientRequest, IncomingMessage, RequestOptions } from "http";

import { Todo, TodoGateway } from "../todos/entities/todo";

interface RestListTodoResponse {
    count: number;
    items: RestTodoResponse[]
}

interface RestTodoResponse {
    id: string,
    timestamp: string,
    description: string;
}

interface RestCreateErrorResponse {
    error: string
}

export default class RestTodoGateway implements TodoGateway {

    async save(todo: Todo): Promise<Todo> {

        const requestBody = Buffer.from(JSON.stringify({ description: todo.description }))

        const options: RequestOptions = {
            host: String(process.env.HOST),
            port: Number(process.env.PORT),
            path: `/todos`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": requestBody.length
            }
        }

        const response = await new Promise<IncomingMessage>((resolve, reject) => {
            const req = new ClientRequest(options);
            req.on("response", (message: IncomingMessage) => resolve(message))
            req.on("error", (error: Error) => reject(error))
            req.write(requestBody)
            req.end()
        })

        const responseBody = JSON.parse(response.read());

        if (response.statusCode !== 200) throw new Error((responseBody as RestCreateErrorResponse).error);

        const { id, timestamp, description } = responseBody as RestTodoResponse;

        return new Todo(id, description, new Date(timestamp))
    }

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

        const body: RestListTodoResponse = JSON.parse(response.read());

        return body.items.map(i => new Todo(i.id, i.description, new Date(i.timestamp)));
    }
}