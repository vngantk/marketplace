import {CommandUseCase} from "./UseCase";

export namespace DeleteAllProducts {
    export type Command = Readonly<{}>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("DeleteAllProducts");
        }
    }
}

export default DeleteAllProducts;
