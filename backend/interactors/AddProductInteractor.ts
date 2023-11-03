import AddProduct from "../../common/usecases/AddProduct";
import Repository from "../repository/Repository";
import {error} from "../../common/utils";

export default class AddProductInteractor extends AddProduct.UseCase {
    constructor(readonly repository: Repository) {
        super();
    }

    override execute(command: AddProduct.Command): Promise<void> {
        try {
            return this.repository.addProduct({
                name: command.name ?? error("name must be provided"),
                description: command.description ?? error("description must be provided"),
                price: command.price ?? error("price must be provided"),
                quantity: command.quantity ?? error("stock must be provided"),
                category: command.category ?? error("category must be provided")
            }).then(() => undefined);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
