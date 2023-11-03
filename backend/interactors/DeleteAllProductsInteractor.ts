import DeleteAllProducts from "../../common/usecases/DeleteAllProducts";
import Repository from "../repository/Repository";
import DeleteAllCategories from "../../common/usecases/DeleteAllCategories";

export default class DeleteAllProductsInteractor extends DeleteAllProducts.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(command: DeleteAllCategories.Command): Promise<void> {
        return this.repository.deleteAllProducts().then(() => undefined);
    }
}
