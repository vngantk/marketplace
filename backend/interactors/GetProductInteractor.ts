import GetProduct from "../../common/usecases/GetProduct";
import Product from "../../common/entities/Product";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class GetProductInteractor extends GetProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(query: GetProduct.Query): Promise<Product | undefined> {
        return this.repository.getProduct(query.id ?? error("id must be provided"));
    }
}
