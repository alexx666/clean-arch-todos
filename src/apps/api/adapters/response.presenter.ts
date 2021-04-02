import Presenter from "../../../libs/do/presenter";

export default class Response implements Presenter {

    constructor(private response: any) {}

    present(data: any) {
        return this.response.json({ body: data})
    }

}