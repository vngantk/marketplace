import {CommandUseCase} from "./UseCase";

export type DeleteProductCommand = Readonly<{
    id: string;
}>

export abstract class DeleteProductUseCase extends CommandUseCase<DeleteProductCommand> {
    protected constructor() {
        super("DeleteProduct")
    }
}


