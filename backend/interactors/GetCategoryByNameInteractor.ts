import {GetCategoryByNameUseCase, GetCategoryByNameQuery} from "../../common/usecases";
import {Repository} from "../repository";
import {Category} from "../../common/entities";
import {error} from "../../common/utils";

export class GetCategoryByNameInteractor extends GetCategoryByNameUseCase {
    constructor(private readonly repository: Repository) {
        super();
    }

    override async execute(query: GetCategoryByNameQuery): Promise<Category | undefined> {
        return await this.repository.getCategoryByName(query.name ?? error("name must be provided"));
    }
}
