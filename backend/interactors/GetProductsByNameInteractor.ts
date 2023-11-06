import {GetProductsByName, GetProductsByNameProperties, GetProductsByNameQuery} from "../../common/usecases";
import {Product} from "../../common/entities";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {QueryInteractor} from "./UseCaseInteractor";

export class GetProductsByNameInteractor extends QueryInteractor<GetProductsByName> implements GetProductsByName {
    constructor(repository: Repository) {
        super(repository, GetProductsByNameProperties);
    }
    override async execute(query: GetProductsByNameQuery): Promise<Product[]> {
        const name = query.name ?? error("name must be provided")
        if (query.exactMatch) {
            return await this.repository.getProductsByName(name);
        } else {
            return await this.repository.getProductsByNamePattern(name);
        }
    }
}
