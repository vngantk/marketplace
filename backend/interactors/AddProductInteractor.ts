import {AddProduct, AddProductCommand, AddProductProperties} from "../../common/usecases";
import {Repository} from "../repository";
import {error} from "../../common/utils";
import {CommandInteractor} from "./UseCaseInteractor";

export class AddProductInteractor extends CommandInteractor<AddProduct> implements AddProduct {
    constructor(repository: Repository) {
        super(repository, AddProductProperties);
    }

    override async execute(command: AddProductCommand): Promise<void> {
        const validatedCommand = this.validateInput(command);
        const category = validatedCommand.category;
        if (await this.repository.getCategoryByName(category) === undefined) {
            throw new Error(`Category '${category}' does not exist`);
        }
        await this.repository.addProduct({...validatedCommand});
    }

    private validateInput(command: AddProductCommand): Required<AddProductCommand> {
        const validated: Required<AddProductCommand> = {
            name: command.name?.trim() ?? error("name must be provided"),
            description: command.description ?? "",
            price: command.price ?? error("price must be provided"),
            quantity: command.quantity ?? error("quantity must be provided"),
            category: command.category ?? error("category must be provided")
        }
        if (validated.name === "") throw new Error("name cannot be empty");
        if (validated.price < 0) throw new Error("price cannot be negative");
        if (validated.quantity < 0) throw new Error("quantity cannot be negative");
        return validated;
    }
}
