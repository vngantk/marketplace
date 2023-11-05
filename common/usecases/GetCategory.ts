import {QueryUseCase} from "./UseCase";
import {Category} from "../entities/Category";

export type GetCategoryQuery = Readonly<{
    id: string;
}>

export abstract class GetCategoryUseCase extends QueryUseCase<GetCategoryQuery, Category | undefined> {
    protected constructor() {
        super("GetCategory")
    }
}


