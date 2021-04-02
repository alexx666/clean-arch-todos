import Some from "../do/some.entity";
import Repository from "../do/repository";

export default class MockRepository implements Repository<Some> {
    find(_: any): Promise<Some> {
        return Promise.resolve({
            id: "lmao"
        })
    }
}