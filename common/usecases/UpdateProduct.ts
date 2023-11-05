import {CommandUseCase} from "./UseCase";

export type UpdateProductCommand = Readonly<{
    id: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    category?: string;
}>

export abstract class UpdateProductUseCase extends CommandUseCase<UpdateProductCommand> {
    protected constructor() {
        super("UpdateProduct")
    }
}


