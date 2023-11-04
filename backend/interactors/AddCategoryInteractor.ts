import AddCategory from "../../common/usecases/AddCategory";
import Repository from "../repository/Repository";

export default class AddCategoryInteractor extends AddCategory.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: AddCategory.Command): Promise<void> {
        await this.repository.addCategory(command)
    }
}
