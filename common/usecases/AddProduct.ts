import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type AddProductCommand = Readonly<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}>

export type AddProduct = CommandUseCase<AddProductCommand>

export const AddProductProperties: CommandUseCaseProperties = { name: "AddProduct", type: "command" }


