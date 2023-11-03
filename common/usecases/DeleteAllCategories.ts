import {CommandUseCase} from "./UseCase";

export namespace DeleteAllCategories {
    export type Command = Readonly<{
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("DeleteAllCategories");
        }
    }
}

export default DeleteAllCategories;
