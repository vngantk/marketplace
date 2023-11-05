import {GetAllCategoriesUseCase, GetAllCategoriesQuery} from "../../common/usecases";
import {Category} from "../../common/entities";
import {Repository} from "../repository";

export class GetAllCategoriesInteractor extends GetAllCategoriesUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetAllCategoriesQuery): Promise<Category[]> {
        return await this.repository.getAllCategories();
    }
}
