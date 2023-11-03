import {QueryUseCase} from "./UseCase";
import {Category} from "../entities/Category";

export namespace GetCategory {
    export type Query = Readonly<{
        id: string;
    }>

    export abstract class UseCase extends QueryUseCase<Query, Category | undefined> {
        protected constructor() {
            super("GetCategory");
        }
    }
}

export default GetCategory;
