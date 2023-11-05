import {QueryUseCase} from "./UseCase";
import {Category} from "../entities";

export type GetAllCategoriesQuery = Readonly<{}>

export abstract class GetAllCategoriesUseCase extends QueryUseCase<GetAllCategoriesQuery, Category[]> {
    protected constructor() {
        super("GetAllCategories")
    }
}


