import GetCategory from "../../common/usecases/GetCategory";
import Category from "../../common/entities/Category";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class GetCategoryInteractor extends GetCategory.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(query: GetCategory.Query): Promise<Category | undefined> {
        return await this.repository.getCategory(query.id ?? error("id must be provided"))
    }
}
