import Presenter from "../../use-cases/do-something/presenter";

export default class Console implements Presenter {
    present(data: any): void {
        console.log("RESULT:", data)
    }

}