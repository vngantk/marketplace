import {CommandUseCase} from "./UseCase";

export namespace AddProduct {
    export type Command = Readonly<{
        name: string;
        description: string;
        price: number;
        quantity: number;
        category: string;
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("AddProduct");
        }
    }
}

export default AddProduct;
