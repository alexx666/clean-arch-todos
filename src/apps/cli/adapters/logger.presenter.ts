import Presenter from "../../../libs/do/presenter";

export default class Console implements Presenter {
    present(data: any): void {
        console.log("RESULT:", data)
    }

}