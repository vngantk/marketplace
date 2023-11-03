import UpdateProduct from "../../common/usecases/UpdateProduct";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class UpdateProductInteractor extends UpdateProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(command: UpdateProduct.Command): Promise<void> {
        return this.repository.updateProduct(command.id ?? error("id must be provided"), command).then(() => undefined);
    }
}
