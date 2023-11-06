import {DeleteAllCategoriesCommand, DeleteAllProducts, DeleteAllProductsProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {CommandInteractor} from "./UseCaseInteractor";

export class DeleteAllProductsInteractor extends CommandInteractor<DeleteAllProducts> implements DeleteAllProducts {
    constructor(repository: Repository) {
        super(repository, DeleteAllProductsProperties);
    }
    override async execute(command: DeleteAllCategoriesCommand): Promise<void> {
        await this.repository.deleteAllProducts()
    }
}
