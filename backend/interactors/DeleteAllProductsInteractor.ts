import DeleteAllProducts from "../../common/usecases/DeleteAllProducts";
import Repository from "../repository/Repository";
import DeleteAllCategories from "../../common/usecases/DeleteAllCategories";

export default class DeleteAllProductsInteractor extends DeleteAllProducts.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteAllCategories.Command): Promise<void> {
        await this.repository.deleteAllProducts()
    }
}
