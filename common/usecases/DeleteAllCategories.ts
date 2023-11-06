import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type DeleteAllCategoriesCommand = Readonly<{}>

export type DeleteAllCategories = CommandUseCase<DeleteAllCategoriesCommand>

export const DeleteAllCategoriesProperties: CommandUseCaseProperties = { name: "DeleteAllCategories", type: "command" }



