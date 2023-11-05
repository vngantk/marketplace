import {DeleteCategoryUseCase, DeleteCategoryCommand} from "../../common/usecases/DeleteCategory";
import {Repository} from "../repository/Repository";
import {error} from "../../common/utils";

export class DeleteCategoryInteractor extends DeleteCategoryUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteCategoryCommand): Promise<void> {
        await this.repository.deleteCategory(command.id ?? error("id must be provided"))
    }
}
