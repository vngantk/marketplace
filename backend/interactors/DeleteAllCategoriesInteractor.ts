import {DeleteAllCategories, DeleteAllCategoriesCommand, DeleteAllCategoriesProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {CommandInteractor} from "./UseCaseInteractor";

export class DeleteAllCategoriesInteractor extends CommandInteractor<DeleteAllCategories> implements DeleteAllCategories {
    constructor(repository: Repository) {
        super(repository, DeleteAllCategoriesProperties);
    }
    override async invoke(request:DeleteAllCategoriesCommand): Promise<void> {
        await this.repository.deleteAllCategories()
    }
}
