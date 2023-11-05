import {GetAllProductsUseCase, GetAllProductsQuery} from "../../common/usecases/GetAllProducts";
import {Product} from "../../common/entities/Product";
import {Repository} from "../repository/Repository";


export class GetAllProductsInteractor extends GetAllProductsUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetAllProductsQuery): Promise<Product[]> {
        return await this.repository.getAllProducts();
    }
}
