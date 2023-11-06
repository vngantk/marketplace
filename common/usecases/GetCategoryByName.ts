import {Category} from "../entities";
import {QueryUseCase, QueryUseCaseProperties} from "./UseCase";

export type GetCategoryByNameQuery = Readonly<{ name: string; }>

export type GetCategoryByName = QueryUseCase<GetCategoryByNameQuery, Category | undefined>

export const GetCategoryByNameProperties: QueryUseCaseProperties = { name: "GetCategoryByName", type: "query" }
