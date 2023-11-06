import {DeleteProduct, DeleteProductCommand, DeleteProductProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {CommandInteractor} from "./UseCaseInteractor";

export class DeleteProductInteractor extends CommandInteractor<DeleteProduct> implements DeleteProduct {
    constructor(repository: Repository) {
        super(repository, DeleteProductProperties);
    }
    override async execute(command: DeleteProductCommand): Promise<void> {
        await this.repository.deleteProduct(command.id ?? error("id must be provided"))
    }
}
