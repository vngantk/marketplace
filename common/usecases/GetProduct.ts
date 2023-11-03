import {QueryUseCase} from "./UseCase";
import {Product} from "../entities/Product";

export namespace GetProduct {
    export type Query = Readonly<{
        id: string;
    }>

    export abstract class UseCase extends QueryUseCase<Query, Product | undefined> {
        protected constructor() {
            super("GetProduct");
        }
    }
}

export default GetProduct;
