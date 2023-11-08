import {GetAllCategories, GetAllCategoriesProperties, GetAllCategoriesQuery} from "../../common/usecases";
import {Category} from "../../common/entities";
import {Repository} from "../repository";
import {QueryInteractor} from "./UseCaseInteractor";

export class GetAllCategoriesInteractor extends QueryInteractor<GetAllCategories> implements GetAllCategories {
    constructor(repository: Repository) {
        super(repository, GetAllCategoriesProperties);
    }
    override async invoke(query: GetAllCategoriesQuery): Promise<Category[]> {
        return await this.repository.getAllCategories();
    }
}
