import GetAllCategories from "../../common/usecases/GetAllCategories";
import Category from "../../common/entities/Category";
import Repository from "../repository/Repository";

export default class GetAllCategoriesInteractor extends GetAllCategories.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetAllCategories.Query): Promise<Category[]> {
        return await this.repository.getAllCategories();
    }
}
