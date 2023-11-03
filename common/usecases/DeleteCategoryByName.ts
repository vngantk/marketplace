import {CommandUseCase} from "./UseCase";

export namespace DeleteCategoryByName {
    export type Command = Readonly<{
        name: string;
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("DeleteCategoryByName");
        }
    }
}

export default DeleteCategoryByName;
