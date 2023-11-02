import {CommandUseCase} from "./UseCase";

export interface UpdateProduct {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    category?: string;
}

export abstract class UpdateProductUseCase extends CommandUseCase<UpdateProduct> {
    protected constructor() {
        super("UpdateProduct");
    }
}
