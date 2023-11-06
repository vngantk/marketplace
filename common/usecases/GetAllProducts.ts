import {Product} from "../entities";
import {QueryUseCase, QueryUseCaseProperties} from "./UseCase";

export type GetAllProductsQuery = Readonly<{}>

export type GetAllProducts = QueryUseCase<GetAllProductsQuery, Product[]>

export const GetAllProductsProperties: QueryUseCaseProperties = { name: "GetAllProducts", type: "query" }
