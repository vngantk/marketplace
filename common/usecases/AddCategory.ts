import {CommandUseCase} from "./UseCase";

export interface AddCategory {
    name: string;
}

export abstract class AddCategoryUseCase extends CommandUseCase<AddCategory> {
    protected constructor() {
        super("AddCategory");
    }
}
