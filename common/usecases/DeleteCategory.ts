import {CommandUseCase} from "./UseCase";

export type DeleteCategoryCommand = Readonly<{
    id: string;
}>

export abstract class DeleteCategoryUseCase extends CommandUseCase<DeleteCategoryCommand> {
    protected constructor() {
        super("DeleteCategory")
    }
}


