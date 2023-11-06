import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type DeleteProductCommand = Readonly<{ id: string; }>

export type DeleteProduct = CommandUseCase<DeleteProductCommand>

export const DeleteProductProperties: CommandUseCaseProperties = { name: "DeleteProduct", type: "command" }
