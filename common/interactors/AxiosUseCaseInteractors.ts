import {AxiosInstance, AxiosResponse} from "axios";
import {
    AddCategory,
    AddCategoryProperties,
    AddProduct,
    AddProductProperties,
    DeleteAllCategories,
    DeleteAllCategoriesProperties,
    DeleteAllProducts,
    DeleteAllProductsProperties,
    DeleteCategory,
    DeleteCategoryByName,
    DeleteCategoryByNameProperties,
    DeleteCategoryProperties,
    DeleteProduct,
    DeleteProductProperties,
    GetAllCategories,
    GetAllCategoriesProperties,
    GetAllProducts,
    GetAllProductsProperties, getUseCaseArray,
    GetCategory,
    GetCategoryByName,
    GetCategoryByNameProperties,
    GetCategoryProperties,
    GetProduct,
    GetProductProperties,
    GetProductsByName,
    GetProductsByNameProperties,
    UpdateProduct,
    UpdateProductProperties,
    UseCase,
    UseCaseCollection, UseCaseProperties, UseCaseCollectionKeys, getUseCaseMap
} from "../usecases";

export class AxiosUseCaseInteractors implements UseCaseCollection {
    constructor(readonly client: AxiosInstance) {}
    readonly AddCategory: AddCategory = {...AddCategoryProperties, invoke: (request) => invoke(this.client, AddCategoryProperties, request)}
    readonly AddProduct: AddProduct = {...AddProductProperties, invoke: (request) => invoke(this.client, AddProductProperties, request)}
    readonly DeleteAllCategories: DeleteAllCategories = {...DeleteAllCategoriesProperties, invoke: (request) => invoke(this.client, DeleteAllCategoriesProperties, request)}
    readonly DeleteAllProducts: DeleteAllProducts = {...DeleteAllProductsProperties, invoke: (request) => invoke(this.client, DeleteAllProductsProperties, request)}
    readonly DeleteCategory: DeleteCategory = {...DeleteCategoryProperties, invoke: (request) => invoke(this.client, DeleteCategoryProperties, request)}
    readonly DeleteCategoryByName: DeleteCategoryByName = {...DeleteCategoryByNameProperties, invoke: (request) => invoke(this.client, DeleteCategoryByNameProperties, request)}
    readonly DeleteProduct: DeleteProduct = {...DeleteProductProperties, invoke: (request) => invoke(this.client, DeleteProductProperties, request)}
    readonly GetAllCategories: GetAllCategories = {...GetAllCategoriesProperties, invoke: (request) => invoke(this.client, GetAllCategoriesProperties, request)}
    readonly GetAllProducts: GetAllProducts = {...GetAllProductsProperties, invoke: (request) => invoke(this.client, GetAllProductsProperties, request)}
    readonly GetCategory: GetCategory = {...GetCategoryProperties, invoke: (request) => invoke(this.client, GetCategoryProperties, request)}
    readonly GetCategoryByName: GetCategoryByName = {...GetCategoryByNameProperties, invoke: (request) => invoke(this.client, GetCategoryByNameProperties, request)}
    readonly GetProduct: GetProduct = {...GetProductProperties, invoke: (request) => invoke(this.client, GetProductProperties, request)}
    readonly GetProductsByName: GetProductsByName = {...GetProductsByNameProperties, invoke: (request) => invoke(this.client, GetProductsByNameProperties, request)}
    readonly UpdateProduct: UpdateProduct = {...UpdateProductProperties, invoke: (request) => invoke(this.client, UpdateProductProperties, request)}

    get array(): readonly UseCase[] {
        return getUseCaseArray(this);
    }

    get map(): ReadonlyMap<UseCaseCollectionKeys, UseCase> {
        return getUseCaseMap(this);
    }
}

function invoke<T extends UseCase<Input, Output>, Input, Output>(client: AxiosInstance, usecase: UseCaseProperties, request: Input): Promise<Output> {
    return client({
        method: "POST",
        url: `/${usecase.type}/${usecase.name}`,
        data: request,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        switch (usecase.type) {
            case "query":
                if (response.status === 200 || response.status === 404) {
                    if (hasResponseData(response)) {
                        return response.data as Output
                    }
                    return undefined as Output
                }
                throw new Error(response.data.error)
            case "command":
                if (response.status === 200) {
                    if (hasResponseData(response)) {
                        return response.data as Output
                    }
                    return undefined as Output
                }
                throw new Error(response.data.error)
            default:
                throw new Error(`Unknown UseCase type ${usecase.type}`)
        }
    }).catch(error => {
        if (usecase.type === "query" && error.response.status === 404) {
            return undefined as Output
        }
        throw new Error(error.message)
    })
}

function hasResponseData(response: AxiosResponse): boolean {
    return (response.status === 200 && response.data !== undefined && response.data !== "")
}
