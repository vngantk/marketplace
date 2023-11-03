import GetCategoryByName from "../../common/usecases/GetCategoryByName";
import repository from "../repository/Repository";
import Category from "../../common/entities/Category";
import {error} from "../../common/utils";

export default class GetCategoryByNameInteractor extends GetCategoryByName.UseCase {
    constructor(private readonly repository: repository) {
        super();
    }

    async execute(query: GetCategoryByName.Query): Promise<Category | undefined> {
        return this.repository.getCategoryByName(query.name ?? error("name must be provided"));
    }
}