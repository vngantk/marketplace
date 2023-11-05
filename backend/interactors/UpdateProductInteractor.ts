import {UpdateProductUseCase, UpdateProductCommand} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";

export class UpdateProductInteractor extends UpdateProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: UpdateProductCommand): Promise<void> {
        const category = command.category;
        if (category !== undefined) {
            if (await this.repository.getCategoryByName(category) === undefined) {
                throw new Error(`Category '${category}' does not exist`);
            }
        }
        await this.repository.updateProduct(command.id ?? error("id must be provided"), command)
    }
}
