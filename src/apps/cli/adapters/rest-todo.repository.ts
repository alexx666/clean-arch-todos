import Repository from "../../../libs/todos/use-cases/repository";
import Todo from "../../../libs/todos/entities/todo.entity";

import { ClientRequest, RequestOptions, IncomingMessage } from "http";

// TODO: externalise so this adapter does not depend on frameworks and libraries
const httpRequest = (options: RequestOptions): Promise<IncomingMessage> => new Promise((resolve, reject) => {
    const req = new ClientRequest(options);
    req.on("response", (res: IncomingMessage) => resolve(res))
    req.on("error", (error: Error) => reject(error))
    req.end()
})

export default class RESTRepository implements Repository<Todo> {

    async find(query: any): Promise<Todo[]> {
        const queryParams = Object.entries(query).map(e => e.join('=')).join('&')

        const req = await httpRequest({
            host: process.env.HOST,
            port: process.env.PORT,
            path: `/todos?${queryParams}`,
            method: "GET"
        });

        const response = JSON.parse(req.read().toString());

        return response.data.map((i: any) => new Todo(i.id));
    }
}