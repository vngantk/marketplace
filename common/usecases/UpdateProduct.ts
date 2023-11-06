import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type UpdateProductCommand = Readonly<{
    id: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    category?: string;
}>

export type UpdateProduct = CommandUseCase<UpdateProductCommand>

export const UpdateProductProperties: CommandUseCaseProperties = { name: "UpdateProduct", type: "command" }
