import { ClientRequest, IncomingMessage, RequestOptions } from "http";
import { Gateway } from "../../modules/shared/entity.gateway";
import Todo from "../../modules/todos/entities/todo";

interface BaseRequestOptions {
	host: string,
	port: number,
}

export default class RestTodoGateway implements Gateway<Todo> {

		constructor(private options: BaseRequestOptions) {}

		public async count(query: any): Promise<number> {
			let marker;

			let listSize = 0;

			while (true) {
				const { items, count, links }: any = await this.findRequest({ ...query, marker });

				listSize += count;

				if ((links as any[]).findIndex(l => l.rel === "next") === -1) return listSize

				marker = items[count - 1].id
			}
		}

    public async delete(list: string, identifier: string): Promise<Todo> {
        const options: RequestOptions = {
            ...this.options,
            path: encodeURI(`/lists/${list}/todos/${identifier}`),
            method: "DELETE"
        }

        const response = await new Promise<IncomingMessage>((resolve, reject) => {
            const req = new ClientRequest(options);
            req.on("response", (message: IncomingMessage) => resolve(message))
            req.on("error", (error: Error) => reject(error))
            req.end()
        })

        const responseBody = JSON.parse(response.read());

        if (response.statusCode !== 200) throw new Error(responseBody.error);

        const { item } = responseBody;

        return new Todo(item.id, list, item.description, new Date(item.start), new Date(item.end))
    }

    public async save(todo: Todo): Promise<Todo> {

        const requestBody = Buffer.from(JSON.stringify({
            description: todo.description,
            start: todo.start.toISOString(),
            end: todo.end.toISOString()
        }))

        const options: RequestOptions = {
            ...this.options,
            path: encodeURI(`/lists/${todo.list}/todos`),
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

        if (response.statusCode !== 200) throw new Error(responseBody.error);

        const { id } = responseBody;

        return new Todo(id, todo.list, todo.description, todo.start, todo.end)
    }

    public async find(query: any): Promise<Todo[]> {
        const body = await this.findRequest(query);

        return body.items.map((i: any) => new Todo(i.id, body.listName, i.description, new Date(i.start), new Date(i.end)));
    }

		private async findRequest(query: any): Promise<any> {
			const listName = query.listName;

			delete query.listName;

			const queryParams = Object.entries(query).map(e => e.join('=')).join('&')

			const options: RequestOptions = {
					...this.options,
					path: encodeURI(`/lists/${listName}/todos?${queryParams}`),
					method: "GET"
			}

			const response = await new Promise<IncomingMessage>((resolve, reject) => {
					const req = new ClientRequest(options);
					req.on("response", (message: IncomingMessage) => resolve(message))
					req.on("error", (error: Error) => reject(error))
					req.end()
			})

			return JSON.parse(response.read());
		}
}
