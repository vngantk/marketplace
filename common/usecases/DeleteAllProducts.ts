import {CommandUseCase} from "./UseCase";

export type DeleteAllProductsCommand = Readonly<{}>

export abstract class DeleteAllProductsUseCase extends CommandUseCase<DeleteAllProductsCommand> {
    protected constructor() {
        super("DeleteAllProducts")
    }
}


