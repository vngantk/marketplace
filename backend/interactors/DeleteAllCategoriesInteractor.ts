import DeleteAllCategories from "../../common/usecases/DeleteAllCategories";
import Repository from "../repository/Repository";

export default class DeleteAllCategoriesInteractor extends DeleteAllCategories.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(request:DeleteAllCategories.Command): Promise<void> {
        return this.repository.deleteAllCategories().then(() => undefined);
    }
}