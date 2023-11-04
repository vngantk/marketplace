import DeleteCategoryByName from "../../common/usecases/DeleteCategoryByName";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class DeleteCategoryByNameInteractor extends DeleteCategoryByName.UseCase {

    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteCategoryByName.Command): Promise<void> {
        await this.repository.deleteCategoryByName(command.name ?? error("name must be provided"))
    }
}
