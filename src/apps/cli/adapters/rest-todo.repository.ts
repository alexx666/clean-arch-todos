import Repository from "../../../libs/core/repository";
import Todo from "../../../libs/todos/entities/todo.entity";

export interface Request {
    body?: string;
    headers?: any;
    method: string;
    host: string;
    port: number;
    path: string;
}

export interface Response {
    statusCode?: number;
    body?: string;
    headers: any;
}

export interface HTTPClient {
    request: (options: Request) => Promise<Response>;
}

export default class RESTRepository implements Repository<Todo> {

    constructor(private httpClient: HTTPClient) {}

    async find(query: any): Promise<Todo[]> {
        const queryParams = Object.entries(query).map(e => e.join('=')).join('&')

        const options: Request = {
            host: String(process.env.HOST),
            port: Number(process.env.PORT),
            path: `/todos?${queryParams}`,
            method: "GET"
        }

        const response = await this.httpClient.request(options);

        const body = JSON.parse(response.body!);

        return body.todos.map((i: any) => new Todo(i.id));
    }
}