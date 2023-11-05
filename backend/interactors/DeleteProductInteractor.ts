import {DeleteProductUseCase, DeleteProductCommand} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";

export class DeleteProductInteractor extends DeleteProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: DeleteProductCommand): Promise<void> {
        await this.repository.deleteProduct(command.id ?? error("id must be provided"))
    }
}
