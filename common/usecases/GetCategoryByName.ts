import {Category} from "../entities";
import {QueryUseCase} from "./UseCase";

export type GetCategoryByNameQuery = Readonly<{
    name: string;
}>

export abstract class GetCategoryByNameUseCase extends QueryUseCase<GetCategoryByNameQuery, Category | undefined> {
    protected constructor() {
        super("GetCategoryByName")
    }
}


