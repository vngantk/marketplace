import {AddCategoryUseCase, AddCategoryCommand} from "../../common/usecases/AddCategory";
import {Repository} from "../repository/Repository";

export class AddCategoryInteractor extends AddCategoryUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: AddCategoryCommand): Promise<void> {
        await this.repository.addCategory(command)
    }
}
