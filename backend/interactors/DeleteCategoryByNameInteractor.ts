import {DeleteCategoryByName, DeleteCategoryByNameCommand, DeleteCategoryByNameProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {CommandInteractor} from "./UseCaseInteractor";

export class DeleteCategoryByNameInteractor extends CommandInteractor<DeleteCategoryByName> implements DeleteCategoryByName {

    constructor(repository: Repository) {
        super(repository, DeleteCategoryByNameProperties);
    }
    override async invoke(command: DeleteCategoryByNameCommand): Promise<void> {
        const categoryName = command.name ?? error("name must be provided")
        if ((await this.repository.getProductsByCategory(categoryName)).length > 0) {
            throw new Error(`There are still products of category '${categoryName}'; cannot delete category!`)
        }
        await this.repository.deleteCategoryByName(categoryName)
    }
}
