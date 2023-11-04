import GetProductsByName from "../../common/usecases/GetProductsByName";
import Product from "../../common/entities/Product";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class GetProductsByNameInteractor extends GetProductsByName.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetProductsByName.Query): Promise<Product[]> {
        const name = query.name ?? error("name must be provided")
        if (query.exactMatch) {
            return await this.repository.getProductsByName(name);
        } else {
            return await this.repository.getProductsByNamePattern(name);
        }
    }
}
