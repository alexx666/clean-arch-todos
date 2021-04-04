import { ClientRequest, IncomingMessage, RequestOptions } from "http";

import { HTTPClient, Request, Response } from "../adapters/rest-todo.repository";

export default class NodeHTTPClient implements HTTPClient {
    public async request(options: Request): Promise<Response> {

        const requestOptions: RequestOptions = options;

        const response: IncomingMessage = await new Promise((resolve, reject) => {
            const req = new ClientRequest(requestOptions);
            req.on("response", (res: IncomingMessage) => resolve(res))
            req.on("error", (error: Error) => reject(error))
            req.end()
        })

        return {
            statusCode: response.statusCode,
            body: response.read().toString(),
            headers: response.headers as any,
        }
    }
}