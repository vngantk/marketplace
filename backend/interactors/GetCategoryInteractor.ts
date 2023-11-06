import {GetCategory, GetCategoryProperties, GetCategoryQuery} from "../../common/usecases";
import {Category} from "../../common/entities";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {QueryInteractor} from "./UseCaseInteractor";

export class GetCategoryInteractor extends QueryInteractor<GetCategory> implements GetCategory {
    constructor(repository: Repository) {
        super(repository, GetCategoryProperties);
    }
    override async execute(query: GetCategoryQuery): Promise<Category | undefined> {
        return await this.repository.getCategory(query.id ?? error("id must be provided"))
    }
}
