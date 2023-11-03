import DeleteProduct from "../../common/usecases/DeleteProduct";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class DeleteProductInteractor extends DeleteProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(command: DeleteProduct.Command): Promise<void> {
        return this.repository.deleteProduct(command.id ?? error("id must be provided")).then(() => undefined);
    }
}
