import DeleteCategory from "../../common/usecases/DeleteCategory";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class DeleteCategoryInteractor extends DeleteCategory.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteCategory.Command): Promise<void> {
        await this.repository.deleteCategory(command.id ?? error("id must be provided"))
    }
}
