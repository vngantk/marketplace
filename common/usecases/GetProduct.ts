import {QueryUseCase, QueryUseCaseProperties} from "./UseCase";
import {Product} from "../entities";

export type GetProductQuery = Readonly<{ id: string; }>

export type GetProduct = QueryUseCase<GetProductQuery, Product | undefined>

export const GetProductProperties: QueryUseCaseProperties = { name: "GetProduct", type: "query" }
