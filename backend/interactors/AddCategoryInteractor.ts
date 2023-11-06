import {AddCategory, AddCategoryCommand, AddCategoryProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {CommandInteractor} from "./UseCaseInteractor";

export class AddCategoryInteractor extends CommandInteractor<AddCategory> implements AddCategory {
    constructor(repository: Repository) {
        super(repository, AddCategoryProperties);
    }
    override async execute(command: AddCategoryCommand): Promise<void> {
        await this.repository.addCategory(command); return
    }
}
