import {DeleteAllCategoriesUseCase, DeleteAllCategoriesCommand} from "../../common/usecases/DeleteAllCategories";
import {Repository} from "../repository/Repository";

export class DeleteAllCategoriesInteractor extends DeleteAllCategoriesUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(request:DeleteAllCategoriesCommand): Promise<void> {
        await this.repository.deleteAllCategories()
    }
}
