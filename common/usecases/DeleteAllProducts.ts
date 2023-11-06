import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type DeleteAllProductsCommand = Readonly<{}>

export type DeleteAllProducts = CommandUseCase<DeleteAllProductsCommand>

export const DeleteAllProductsProperties: CommandUseCaseProperties = { name: "DeleteAllProducts", type: "command" }
