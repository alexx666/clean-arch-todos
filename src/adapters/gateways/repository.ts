import Entity from "../../entities/entity";
import Repository from "../../use-cases/do-something/repository";

export default class MockRepository implements Repository<Entity> {
    find(data: any): Promise<Entity> {
        return Promise.resolve({
            id: "lmao"
        })
    }
}