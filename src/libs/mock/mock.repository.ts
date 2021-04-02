import Some from "../../core/do/some.entity";
import Repository from "../../core/do/repository";

export default class MockRepository implements Repository<Some> {
    find(): Promise<Some[]> {

        const ids = [ "1", "2", "3", "4", "5" ]

        return Promise.resolve(ids.map(id => new Some(id)))
    }
}