import Presenter from "../../use-cases/do-something/presenter";

export default class Response implements Presenter {

    constructor(private response: any) {}

    present(data: any) {
        return this.response.json({ body: data})
    }

}