import {QueryUseCase} from "./UseCase";
import {Product} from "../entities";

export type GetProductQuery = Readonly<{
    id: string;
}>

export abstract class GetProductUseCase extends QueryUseCase<GetProductQuery, Product | undefined> {
    protected constructor() {
        super("GetProduct")
    }
}


