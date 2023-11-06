import {DeleteCategory, DeleteCategoryCommand, DeleteCategoryProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {CommandInteractor} from "./UseCaseInteractor";

export class DeleteCategoryInteractor extends CommandInteractor<DeleteCategory> implements DeleteCategory {
    constructor(repository: Repository) {
        super(repository, DeleteCategoryProperties);
    }

    override async execute(command: DeleteCategoryCommand): Promise<void> {
        const id = command.id ?? error("id must be provided")
        const category = await this.repository.getCategory(id)
        if (category) {
            if ((await this.repository.getProductsByCategory(category.name)).length > 0) {
                throw new Error(`There are still products of category '${category.name}'; cannot delete category!`)
            }
            await this.repository.deleteCategory(id)
        }
    }
}
