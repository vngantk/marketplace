import {CommandUseCase, CommandUseCaseProperties} from "./UseCase";

export type AddCategoryCommand = Readonly<{ name: string }>

export type AddCategory = CommandUseCase<AddCategoryCommand>

export const AddCategoryProperties: CommandUseCaseProperties = { name: "AddCategory", type: "command" }
