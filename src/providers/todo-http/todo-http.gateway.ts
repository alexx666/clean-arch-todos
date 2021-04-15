import { ClientRequest, IncomingMessage, RequestOptions } from "http";
import { ReadableGateway, WritableGateway } from "../../modules/shared/entity.gateway";
import { Todo } from "../../modules/todos/entities/todo";

interface RestListTodoResponse {
    count: number;
    items: RestTodoResponse[]
}

interface RestTodoResponse {
    id: string,
    due: string,
    description: string;
}

interface RestCreateErrorResponse {
    error: string
}

interface RestDeleteTodoResponse {
    item: RestTodoResponse;
}

export default class RestTodoGateway implements ReadableGateway<Todo>, WritableGateway<Todo> {

    public async delete(identifier: string): Promise<Todo> {
        const options: RequestOptions = {
            host: String(process.env.HOST),
            port: Number(process.env.PORT),
            path: `/todos/${identifier}`,
            method: "DELETE"
        }

        const response = await new Promise<IncomingMessage>((resolve, reject) => {
            const req = new ClientRequest(options);
            req.on("response", (message: IncomingMessage) => resolve(message))
            req.on("error", (error: Error) => reject(error))
            req.end()
        })

        const responseBody = JSON.parse(response.read());

        if (response.statusCode !== 200) throw new Error((responseBody as RestCreateErrorResponse).error);

        const { item } = responseBody as RestDeleteTodoResponse;

        return new Todo(item.id, item.description, new Date(item.due))
    }

    public async save(todo: Todo): Promise<Todo> {

        const requestBody = Buffer.from(JSON.stringify({
            description: todo.description,
            due: todo.due.toISOString()
        }))

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

        const { id, due, description } = responseBody as RestTodoResponse;

        return new Todo(id, description, new Date(due))
    }

    public async find(query: any): Promise<Todo[]> {
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

        return body.items.map(i => new Todo(i.id, i.description, new Date(i.due)));
    }
}
