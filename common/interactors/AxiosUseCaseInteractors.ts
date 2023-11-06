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
    GetAllProductsProperties,
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
    UseCaseCollection
} from "../usecases";

function hasResponseData(response: AxiosResponse): boolean {
    return (response.status === 200 && response.data !== undefined && response.data !== "")
}

export class AxiosUseCaseInteractors implements UseCaseCollection {
    constructor(readonly client: AxiosInstance) {}

    protected dispatch<T extends UseCase<Req, Resp>, Req, Resp>(usecase: Omit<T, "execute">, request: Req): Promise<Resp> {
        return this.client({
            method: "POST",
            url: `/${usecase.type}/${usecase.name}`,
            data: request,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (usecase.type === "query") {
                if (response.status === 200 || response.status === 404) {
                    if (hasResponseData(response)) {
                        return response.data as Resp
                    }
                    return undefined as Resp
                }
                throw new Error(response.data.error)
            }
            if (usecase.type === "command") {
                if (response.status === 200) {
                    if (hasResponseData(response)) {
                        return response.data as Resp
                    }
                    return undefined as Resp
                }
                throw new Error(response.data.error)
            }
            return response.data as Resp
        }).catch(error => {
            if (usecase.type === "query" && error.response.status === 404) {
                return undefined as Resp
            }
            throw new Error(error.message)
        })
    }

    readonly AddCategory: AddCategory = {...AddCategoryProperties, execute: (request) => this.dispatch(AddCategoryProperties, request)}
    readonly AddProduct: AddProduct = {...AddProductProperties, execute: (request) => this.dispatch(AddProductProperties, request)}
    readonly DeleteAllCategories: DeleteAllCategories = {...DeleteAllCategoriesProperties, execute: (request) => this.dispatch(DeleteAllCategoriesProperties, request)}
    readonly DeleteAllProducts: DeleteAllProducts = {...DeleteAllProductsProperties, execute: (request) => this.dispatch(DeleteAllProductsProperties, request)}
    readonly DeleteCategory: DeleteCategory = {...DeleteCategoryProperties, execute: (request) => this.dispatch(DeleteCategoryProperties, request)}
    readonly DeleteCategoryByName: DeleteCategoryByName = {...DeleteCategoryByNameProperties, execute: (request) => this.dispatch(DeleteCategoryByNameProperties, request)}
    readonly DeleteProduct: DeleteProduct = {...DeleteProductProperties, execute: (request) => this.dispatch(DeleteProductProperties, request)}
    readonly GetAllCategories: GetAllCategories = {...GetAllCategoriesProperties, execute: (request) => this.dispatch(GetAllCategoriesProperties, request)}
    readonly GetAllProducts: GetAllProducts = {...GetAllProductsProperties, execute: (request) => this.dispatch(GetAllProductsProperties, request)}
    readonly GetCategory: GetCategory = {...GetCategoryProperties, execute: (request) => this.dispatch(GetCategoryProperties, request)}
    readonly GetCategoryByName: GetCategoryByName = {...GetCategoryByNameProperties, execute: (request) => this.dispatch(GetCategoryByNameProperties, request)}
    readonly GetProduct: GetProduct = {...GetProductProperties, execute: (request) => this.dispatch(GetProductProperties, request)}
    readonly GetProductsByName: GetProductsByName = {...GetProductsByNameProperties, execute: (request) => this.dispatch(GetProductsByNameProperties, request)}
    readonly UpdateProduct: UpdateProduct = {...UpdateProductProperties, execute: (request) => this.dispatch(UpdateProductProperties, request)}

    readonly all: UseCase[] = [
        this.AddCategory,
        this.AddProduct,
        this.DeleteAllCategories,
        this.DeleteAllProducts,
        this.DeleteCategory,
        this.DeleteCategoryByName,
        this.DeleteProduct,
        this.GetAllCategories,
        this.GetAllProducts,
        this.GetCategory,
        this.GetCategoryByName,
        this.GetProduct,
        this.GetProductsByName,
        this.UpdateProduct
    ];
}
