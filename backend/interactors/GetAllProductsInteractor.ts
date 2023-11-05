import {GetAllProductsUseCase, GetAllProductsQuery} from "../../common/usecases";
import {Product} from "../../common/entities";
import {Repository} from "../repository";

export class GetAllProductsInteractor extends GetAllProductsUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetAllProductsQuery): Promise<Product[]> {
        return await this.repository.getAllProducts();
    }
}
