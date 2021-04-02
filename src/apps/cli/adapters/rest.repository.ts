import Repository from "../../../libs/do/repository";
import Some from "../../../libs/do/some.entity";

import { ClientRequest, RequestOptions, IncomingMessage } from "http";

const httpRequest = (options: RequestOptions): Promise<IncomingMessage> => new Promise((resolve, reject) => {
    const req = new ClientRequest(options);
    req.on("response", (res: IncomingMessage) => resolve(res))
    req.on("error", (error: Error) => reject(error))
    req.end()
})

export default class RESTRepository implements Repository<Some> {

    async find(query: any): Promise<Some[]> {
        const queryParams = Object.entries(query).map(e => e.join('=')).join('&')

        const req = await httpRequest({
            host: process.env.HOST,
            port: process.env.PORT,
            path: `/do?${queryParams}`,
            method: "GET"
        });

        const response = JSON.parse(req.read().toString());

        return response.data.map((i: any) => new Some(i.id));
    }
}