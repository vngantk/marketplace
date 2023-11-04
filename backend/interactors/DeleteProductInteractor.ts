import DeleteProduct from "../../common/usecases/DeleteProduct";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class DeleteProductInteractor extends DeleteProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteProduct.Command): Promise<void> {
        await this.repository.deleteProduct(command.id ?? error("id must be provided"))
    }
}
