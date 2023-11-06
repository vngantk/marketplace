import {QueryUseCase, QueryUseCaseProperties} from "./UseCase";
import {Category} from "../entities";

export type GetCategoryQuery = Readonly<{ id: string; }>

export type GetCategory = QueryUseCase<GetCategoryQuery, Category | undefined>

export const GetCategoryProperties: QueryUseCaseProperties = { name: "GetCategory", type: "query" }

