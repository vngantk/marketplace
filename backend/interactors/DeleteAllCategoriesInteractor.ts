import {DeleteAllCategoriesUseCase, DeleteAllCategoriesCommand} from "../../common/usecases";
import {Repository} from "../repository";

export class DeleteAllCategoriesInteractor extends DeleteAllCategoriesUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(request:DeleteAllCategoriesCommand): Promise<void> {
        await this.repository.deleteAllCategories()
    }
}
