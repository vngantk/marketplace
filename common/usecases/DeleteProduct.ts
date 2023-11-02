import {CommandUseCase} from "./UseCase";

export interface DeleteProduct {
    id: string;
}

export abstract class DeleteProductUseCase extends CommandUseCase<DeleteProduct> {
    protected constructor() {
        super("DeleteProduct");
    }
}
