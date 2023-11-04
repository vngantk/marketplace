import {CommandUseCase} from "./UseCase";

export namespace DeleteCategory {
    export type Command = Readonly<{
        id: string;
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("DeleteCategory");
        }
    }
}

export default DeleteCategory;
