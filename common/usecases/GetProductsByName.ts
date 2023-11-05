import {QueryUseCase} from "./UseCase";
import {Product} from "../entities";

export type GetProductsByNameQuery = Readonly<{
    name: string;
        exactMatch?: boolean;
}>

export abstract class GetProductsByNameUseCase extends QueryUseCase<GetProductsByNameQuery, Product[]> {
    protected constructor() {
        super("GetProductsByName")
    }
}


