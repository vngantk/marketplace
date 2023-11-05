import {DeleteAllProductsUseCase} from "../../common/usecases";
import {DeleteAllCategoriesCommand} from "../../common/usecases";
import {Repository} from "../repository";

export class DeleteAllProductsInteractor extends DeleteAllProductsUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteAllCategoriesCommand): Promise<void> {
        await this.repository.deleteAllProducts()
    }
}
