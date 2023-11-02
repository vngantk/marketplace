import {CommandUseCase} from "./UseCase";

export interface AddProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}

export abstract class AddProductUseCase extends CommandUseCase<AddProduct> {
    protected constructor() {
        super("AddProduct");
    }
}


