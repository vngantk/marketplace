import {GetCategoryUseCase, GetCategoryQuery} from "../../common/usecases";
import {Category} from "../../common/entities";
import {Repository} from "../repository";
import {error} from "../../common/utils";

export class GetCategoryInteractor extends GetCategoryUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetCategoryQuery): Promise<Category | undefined> {
        return await this.repository.getCategory(query.id ?? error("id must be provided"))
    }
}
