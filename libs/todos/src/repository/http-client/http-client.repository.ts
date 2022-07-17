import { IncomingMessage, request } from "http";
import { ListTodosResponse } from "../../boundry/list-todos/list-todos";

import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";
import Name from "../../value-objects/list-name";

import { ListRepository } from "../list.repository";
import HttpClientMapper from "./http-client.mapper";

interface HttpClientConfig {
    host: string;
    port: number
}

export default class HttpClientTodoGateway implements ListRepository {

    constructor(private readonly config: HttpClientConfig) { }

    public get(name: string): Promise<List> {
        const options = {
            host: this.config.host,
            port: this.config.port,
            method: "GET",
            path: `/lists/${name}/todos`,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return new Promise((resolve, reject) => {
            const handler = (res: IncomingMessage) => {
                res.setEncoding('utf8');

                res.on("data", (body) => {
                    const listTodoResponse = JSON.parse(body);

                    const list = HttpClientMapper.fromListTodosResponse(listTodoResponse);

                    resolve(list);
                });

                res.on("error", reject);
            }

            const req = request(options, handler);

            req.on("error", reject);
            req.end();
        });
    }

    public create(list: List): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public update(list: List): Promise<void> {
        throw new Error("Method not implemented.");
    }
}