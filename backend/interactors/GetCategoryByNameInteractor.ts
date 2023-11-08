import {GetCategoryByName, GetCategoryByNameProperties, GetCategoryByNameQuery} from "../../common/usecases";
import {Repository} from "../repository";
import {Category} from "../../common/entities";
import {error} from "../../common/utils";
import {QueryInteractor} from "./UseCaseInteractor";

export class GetCategoryByNameInteractor extends QueryInteractor<GetCategoryByName> implements GetCategoryByName {
    constructor(repository: Repository) {
        super(repository, GetCategoryByNameProperties);
    }
    override async invoke(query: GetCategoryByNameQuery): Promise<Category | undefined> {
        return await this.repository.getCategoryByName(query.name ?? error("name must be provided"));
    }
}
