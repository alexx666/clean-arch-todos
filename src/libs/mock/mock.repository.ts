import Some from "../../core/do/some.entity";
import Repository from "../../core/do/repository";

export default class MockRepository implements Repository<Some> {
    find(query: any): Promise<Some[]> {
        const limit = Number(query.limit) || 20

        const uniqueIds = Array(limit).keys()
        const ids = Array.from(uniqueIds)
        const idStrings = ids.map(id => String(id))

        return Promise.resolve(idStrings.map(id => new Some(id)))
    }
}