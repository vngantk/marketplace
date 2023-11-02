import {QueryUseCase} from "./UseCase";
import {Product} from "../entities/Product";

export interface GetProduct {
    id: string;
}

export abstract class GetProductUseCase extends QueryUseCase<GetProduct, Product | undefined> {
    protected constructor() {
        super("GetProduct");
    }
}
