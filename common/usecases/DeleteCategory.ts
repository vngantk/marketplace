import {CommandUseCase} from "./UseCase";

export interface DeleteCategory {
    name: string;
}

export abstract class DeleteCategoryUseCase extends CommandUseCase<DeleteCategory> {
    protected constructor() {
        super("DeleteCategory");
    }
}
