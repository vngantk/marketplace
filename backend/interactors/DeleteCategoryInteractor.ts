import DeleteCategory from "../../common/usecases/DeleteCategory";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class DeleteCategoryInteractor extends DeleteCategory.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(command: DeleteCategory.Command): Promise<void> {
        return this.repository.deleteCategory(command.name ?? error("name must be provided")).then(() => undefined);
    }
}
