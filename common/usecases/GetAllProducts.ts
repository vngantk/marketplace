import {Product} from "../entities/Product";
import {QueryUseCase} from "./UseCase";

export namespace GetAllProducts {
    export type Query = Readonly<{}>

    export abstract class UseCase extends QueryUseCase<Query, Product[]> {
        protected constructor() {
            super("GetAllProducts");
        }
    }
}

export default GetAllProducts;
