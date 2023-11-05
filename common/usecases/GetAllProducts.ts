import {Product} from "../entities/Product";
import {QueryUseCase} from "./UseCase";

export type GetAllProductsQuery = Readonly<{}>

export abstract class GetAllProductsUseCase extends QueryUseCase<GetAllProductsQuery, Product[]> {
    protected constructor() {
        super("GetAllProducts")
    }
}


