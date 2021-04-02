import Presenter from "../../../core/do/presenter";

export default class Console implements Presenter {
    present(data: any): void {
        console.log("RESULT:", data)
    }
}