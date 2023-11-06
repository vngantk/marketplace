import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type DeleteCategoryByNameCommand = Readonly<{ name: string; }>

export type DeleteCategoryByName = CommandUseCase<DeleteCategoryByNameCommand>

export const DeleteCategoryByNameProperties: CommandUseCaseProperties = { name: "DeleteCategoryByName", type: "command" }
