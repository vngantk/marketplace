import GetAllProducts from "../../common/usecases/GetAllProducts";
import Product from "../../common/entities/Product";
import Repository from "../repository/Repository";


export default class GetAllProductsInteractor extends GetAllProducts.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(query: GetAllProducts.Query): Promise<Product[]> {
        return this.repository.getAllProducts();
    }
}
