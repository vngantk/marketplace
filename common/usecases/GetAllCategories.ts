import {QueryUseCase} from "./UseCase";
import {Category} from "../entities/Category";

export namespace GetAllCategories {
    export type Query = Readonly<{}>

    export abstract class UseCase extends QueryUseCase<Query, Category[]> {
        protected constructor() {
            super("GetAllCategories");
        }
    }
}

export default GetAllCategories;
