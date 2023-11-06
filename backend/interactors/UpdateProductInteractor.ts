import {UpdateProduct, UpdateProductCommand, UpdateProductProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {CommandInteractor} from "./UseCaseInteractor";

export class UpdateProductInteractor extends CommandInteractor<UpdateProduct> implements UpdateProduct {
    constructor(repository: Repository) {
        super(repository, UpdateProductProperties);
    }
    override async execute(command: UpdateProductCommand): Promise<void> {
        const id = command.id ?? error("id must be provided");
        const category = command.category;
        if (category !== undefined && await this.repository.getCategoryByName(category) === undefined) {
            throw new Error(`Category '${category}' does not exist`);
        }
        await this.repository.updateProduct(id, command)
    }
}
