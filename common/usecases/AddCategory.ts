import {CommandUseCase} from "./UseCase";

export namespace AddCategory {
    export type Command = Readonly<{
        name: string;
    }>

    export abstract class UseCase extends CommandUseCase<Command> {
        protected constructor() {
            super("AddCategory");
        }
    }
}

export default AddCategory;