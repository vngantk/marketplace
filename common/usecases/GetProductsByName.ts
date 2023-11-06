import {QueryUseCase, QueryUseCaseProperties} from "./UseCase";
import {Product} from "../entities";

export type GetProductsByNameQuery = Readonly<{ name: string; exactMatch?: boolean; }>

export type GetProductsByName = QueryUseCase<GetProductsByNameQuery, Product[]>

export const GetProductsByNameProperties: QueryUseCaseProperties = { name: "GetProductsByName", type: "query" }
