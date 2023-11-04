import UpdateProduct from "../../common/usecases/UpdateProduct";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class UpdateProductInteractor extends UpdateProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: UpdateProduct.Command): Promise<void> {
        const category = command.category;
        if (category !== undefined) {
            if (await this.repository.getCategoryByName(category) === undefined) {
                throw new Error(`Category '${category}' does not exist`);
            }
        }
        await this.repository.updateProduct(command.id ?? error("id must be provided"), command)
    }
}
