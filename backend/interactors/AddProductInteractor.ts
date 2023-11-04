import AddProduct from "../../common/usecases/AddProduct";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class AddProductInteractor extends AddProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override async execute(command: AddProduct.Command): Promise<void> {
        const name = command.name?.trim() ?? error("name must be provided");
        const description = command.description ?? "";
        const price = command.price ?? error("price must be provided");
        const quantity = command.quantity ?? error("quantity must be provided");
        const category = command.category ?? error("category must be provided");
        if (name === "") {
            throw new Error("name cannot be empty");
        }
        if (await this.repository.getCategoryByName(category) === undefined) {
            throw new Error(`Category '${category}' does not exist`);
        }
        if (price < 0) {
            throw new Error("price cannot be negative");
        }
        if (quantity < 0) {
            throw new Error("quantity cannot be negative");
        }
        await this.repository.addProduct({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            category: category
        });
    }
}
