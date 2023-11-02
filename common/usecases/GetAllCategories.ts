import {QueryUseCase} from "./UseCase";
import {Category} from "../entities/Category";

export interface GetAllCategories {

}

export abstract class GetAllCategoriesUseCase extends QueryUseCase<GetAllCategories, Category[]> {
    protected constructor() {
        super("GetAllCategories");
    }
}
