import {CommandUseCase} from "./UseCase";

export interface DeleteAllProducts {

}

export abstract class DeleteAllProductsUseCase extends CommandUseCase<DeleteAllProducts> {
    protected constructor() {
        super("DeleteAllProducts");
    }
}
