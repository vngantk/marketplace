import {DeleteAllProductsUseCase} from "../../common/usecases/DeleteAllProducts";
import {Repository} from "../repository/Repository";
import {DeleteAllCategoriesCommand} from "../../common/usecases/DeleteAllCategories";

export class DeleteAllProductsInteractor extends DeleteAllProductsUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteAllCategoriesCommand): Promise<void> {
        await this.repository.deleteAllProducts()
    }
}
