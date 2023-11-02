import {QueryUseCase} from "./UseCase";
import {Product} from "../entities/Product";

export interface GetProductsByNamePattern {
    pattern: string;
}

export abstract class GetProductsByNamePatternUseCase extends QueryUseCase<GetProductsByNamePattern, Product[]> {
    protected constructor() {
        super("GetProductsByNamePattern");
    }
}
