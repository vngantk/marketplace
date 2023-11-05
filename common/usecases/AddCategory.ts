import {CommandUseCase} from "./UseCase";

export type AddCategoryCommand = Readonly<{
    name: string;
}>

export abstract class AddCategoryUseCase extends CommandUseCase<AddCategoryCommand> {
    protected constructor() {
        super("AddCategory")
    }
}


