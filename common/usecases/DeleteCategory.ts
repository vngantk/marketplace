import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type DeleteCategoryCommand = Readonly<{ id: string; }>

export type DeleteCategory = CommandUseCase<DeleteCategoryCommand>

export const DeleteCategoryProperties: CommandUseCaseProperties = { name: "DeleteCategory", type: "command" }
