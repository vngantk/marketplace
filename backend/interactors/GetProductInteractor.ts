import {GetProductUseCase, GetProductQuery} from "../../common/usecases/GetProduct";
import {Product} from "../../common/entities/Product";
import {Repository} from "../repository/Repository";
import {error} from "../../common/utils";

export class GetProductInteractor extends GetProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetProductQuery): Promise<Product | undefined> {
        return await this.repository.getProduct(query.id ?? error("id must be provided"));
    }
}
