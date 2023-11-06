import {GetAllProducts, GetAllProductsProperties, GetAllProductsQuery} from "../../common/usecases";
import {Product} from "../../common/entities";
import {Repository} from "../repository";
import {QueryInteractor} from "./UseCaseInteractor";

export class GetAllProductsInteractor extends QueryInteractor<GetAllProducts> implements GetAllProducts {
    constructor(repository: Repository) {
        super(repository, GetAllProductsProperties);
    }
    override async execute(query: GetAllProductsQuery): Promise<Product[]> {
        return await this.repository.getAllProducts();
    }
}
