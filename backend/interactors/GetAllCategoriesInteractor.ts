import {GetAllCategoriesUseCase, GetAllCategoriesQuery} from "../../common/usecases/GetAllCategories";
import {Category} from "../../common/entities/Category";
import {Repository} from "../repository/Repository";

export class GetAllCategoriesInteractor extends GetAllCategoriesUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetAllCategoriesQuery): Promise<Category[]> {
        return await this.repository.getAllCategories();
    }
}
