import Category from "../entities/Category";
import {QueryUseCase} from "./UseCase";

export namespace GetCategoryByName {
    export type Query = Readonly<{
        name: string;
    }>

    export abstract class UseCase extends QueryUseCase<Query, Category | undefined>{
        protected constructor() {
            super("GetCategoryByName");
        }
    }
}

export default GetCategoryByName;
