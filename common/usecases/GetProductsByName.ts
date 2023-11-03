import {QueryUseCase} from "./UseCase";
import {Product} from "../entities/Product";

export namespace GetProductsByName {
    export type Query = Readonly<{
        name: string;
        exactMatch?: boolean;
    }>

    export abstract class UseCase extends QueryUseCase<Query, Product[]> {
        protected constructor() {
            super("GetProductsByName");
        }
    }
}

export default GetProductsByName;
