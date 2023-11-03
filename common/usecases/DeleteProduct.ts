import {CommandUseCase} from "./UseCase";

export namespace DeleteProduct {
    export type Command = Readonly<{
        id: string;
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("DeleteProduct");
        }
    }
}

export default DeleteProduct;
