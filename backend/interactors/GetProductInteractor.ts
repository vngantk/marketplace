import {GetProduct, GetProductProperties, GetProductQuery} from "../../common/usecases";
import {Product} from "../../common/entities";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {QueryInteractor} from "./UseCaseInteractor";

export class GetProductInteractor extends QueryInteractor<GetProduct> implements GetProduct {
    constructor(repository: Repository) {
        super(repository, GetProductProperties);
    }
    override async invoke(query: GetProductQuery): Promise<Product | undefined> {
        return await this.repository.getProduct(query.id ?? error("id must be provided"));
    }
}
