import {DeleteCategoryByNameUseCase, DeleteCategoryByNameCommand} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";

export class DeleteCategoryByNameInteractor extends DeleteCategoryByNameUseCase {

    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteCategoryByNameCommand): Promise<void> {
        await this.repository.deleteCategoryByName(command.name ?? error("name must be provided"))
    }
}
