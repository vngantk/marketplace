import {CommandUseCase} from "./UseCase";

export type DeleteAllCategoriesCommand = Readonly<{
}>

export abstract class DeleteAllCategoriesUseCase extends CommandUseCase<DeleteAllCategoriesCommand> {
    protected constructor() {
        super("DeleteAllCategories")
    }
}


