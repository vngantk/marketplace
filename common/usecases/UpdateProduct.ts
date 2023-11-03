import {CommandUseCase} from "./UseCase";

export namespace UpdateProduct {
    export type Command = Readonly<{
        id: string;
        name?: string;
        description?: string;
        price?: number;
        quantity?: number;
        category?: string;
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("UpdateProduct");
        }
    }
}

export default UpdateProduct;
