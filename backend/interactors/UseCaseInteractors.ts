import {Repository} from "../repository";
import {AddCategoryInteractor} from "./AddCategoryInteractor";
import {AddProductInteractor} from "./AddProductInteractor";
import {DeleteAllCategoriesInteractor} from "./DeleteAllCategoriesInteractor";
import {DeleteAllProductsInteractor} from "./DeleteAllProductsInteractor";
import {DeleteCategoryInteractor} from "./DeleteCategoryInteractor";
import {DeleteCategoryByNameInteractor} from "./DeleteCategoryByNameInteractor";
import {DeleteProductInteractor} from "./DeleteProductInteractor";
import {GetAllCategoriesInteractor} from "./GetAllCategoriesInteractor";
import {GetAllProductsInteractor} from "./GetAllProductsInteractor";
import {GetCategoryInteractor} from "./GetCategoryInteractor";
import {GetCategoryByNameInteractor} from "./GetCategoryByNameInteractor";
import {GetProductInteractor} from "./GetProductInteractor";
import {GetProductsByNameInteractor} from "./GetProductsByNameInteractor";
import {UpdateProductInteractor} from "./UpdateProductInteractor";
import {getUseCaseArray, getUseCaseMap, UseCase, UseCaseCollection, UseCaseCollectionKeys} from "../../common/usecases";

export class UseCaseInteractors implements UseCaseCollection {
    constructor(readonly repository: Repository) {}

    readonly AddCategory = new AddCategoryInteractor(this.repository);
    readonly AddProduct = new AddProductInteractor(this.repository);
    readonly DeleteAllCategories = new DeleteAllCategoriesInteractor(this.repository);
    readonly DeleteAllProducts = new DeleteAllProductsInteractor(this.repository);
    readonly DeleteCategory = new DeleteCategoryInteractor(this.repository);
    readonly DeleteCategoryByName = new DeleteCategoryByNameInteractor(this.repository);
    readonly DeleteProduct = new DeleteProductInteractor(this.repository);
    readonly GetAllCategories = new GetAllCategoriesInteractor(this.repository);
    readonly GetAllProducts = new GetAllProductsInteractor(this.repository);
    readonly GetCategory = new GetCategoryInteractor(this.repository);
    readonly GetCategoryByName = new GetCategoryByNameInteractor(this.repository);
    readonly GetProduct = new GetProductInteractor(this.repository);
    readonly GetProductsByName = new GetProductsByNameInteractor(this.repository);
    readonly UpdateProduct = new UpdateProductInteractor(this.repository);

    get array(): readonly UseCase[] {
        return getUseCaseArray(this)
    }

    get map(): ReadonlyMap<UseCaseCollectionKeys, UseCase> {
        return getUseCaseMap(this)
    }

}
