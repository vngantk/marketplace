import {QueryUseCase, QueryUseCaseProperties} from "./UseCase";
import {Category} from "../entities";

export type GetAllCategoriesQuery = Readonly<{}>

export type GetAllCategories = QueryUseCase<GetAllCategoriesQuery, Category[]>

export const GetAllCategoriesProperties: QueryUseCaseProperties = { name: "GetAllCategories", type: "query" }
