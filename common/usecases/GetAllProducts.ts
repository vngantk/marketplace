import {Product} from "../entities/Product";
import {QueryUseCase} from "./UseCase";

export interface GetAllProducts {
}

export abstract class GetProductsUseCase extends QueryUseCase<GetAllProducts, Product[]> {
    protected constructor() {
        super("GetProducts");
    }
    abstract execute(): Promise<Product[]>;
}

export interface GetAllProducts {

}

export abstract class GetAllProductsUseCase extends QueryUseCase<GetAllProducts, Product[]> {
    protected constructor() {
        super("GetAllProducts");
    }
}
