import {CommandUseCase} from "./UseCase";

export type AddProductCommand = Readonly<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}>

export abstract class AddProductUseCase extends CommandUseCase<AddProductCommand> {
    protected constructor() {
        super("AddProduct")
    }
}


