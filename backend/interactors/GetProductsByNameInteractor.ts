import {GetProductsByNameUseCase, GetProductsByNameQuery} from "../../common/usecases";
import {Product} from "../../common/entities";
import {Repository} from "../repository";
import {error} from "../../common/utils";

export class GetProductsByNameInteractor extends GetProductsByNameUseCase {
    constructor(readonly repository: Repository) {
        super();
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
