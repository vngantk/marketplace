import {CommandUseCase} from "./UseCase";

export type DeleteCategoryByNameCommand = Readonly<{
    name: string;
}>

export abstract class DeleteCategoryByNameUseCase extends CommandUseCase<DeleteCategoryByNameCommand> {
    protected constructor() {
        super("DeleteCategoryByName")
    }
}


