import Repository from "../repository/Repository";
import UseCases from "../../common/usecases/UseCases";
import AddCategoryInteractor from "./AddCategoryInteractor";
import AddProductInteractor from "./AddProductInteractor";
import DeleteAllCategoriesInteractor from "./DeleteAllCategoriesInteractor";
import DeleteAllProductsInteractor from "./DeleteAllProductsInteractor";
import DeleteCategoryInteractor from "./DeleteCategoryInteractor";
import DeleteCategoryByNameInteractor from "./DeleteCategoryByNameInteractor";
import DeleteProductInteractor from "./DeleteProductInteractor";
import GetAllCategoriesInteractor from "./GetAllCategoriesInteractor";
import GetAllProductsInteractor from "./GetAllProductsInteractor";
import GetCategoryInteractor from "./GetCategoryInteractor";
import GetCategoryByNameInteractor from "./GetCategoryByNameInteractor";
import GetProductInteractor from "./GetProductInteractor";
import GetProductsByNameInteractor from "./GetProductsByNameInteractor";
import UpdateProductInteractor from "./UpdateProductInteractor";
import {UseCase} from "../../common/usecases/UseCase";

function push<T>(array: any[], item: T): T {
    array.push(item);
    return item;
}

export class UseCaseInteractors implements UseCases {
    constructor(readonly repository: Repository) {}
    readonly all: UseCase[] = [];
    readonly AddCategory = push(this.all, new AddCategoryInteractor(this.repository));
    readonly AddProduct = push(this.all, new AddProductInteractor(this.repository));
    readonly DeleteAllCategories = push(this.all, new DeleteAllCategoriesInteractor(this.repository));
    readonly DeleteAllProducts = push(this.all, new DeleteAllProductsInteractor(this.repository));
    readonly DeleteCategory = push(this.all, new DeleteCategoryInteractor(this.repository));
    readonly DeleteCategoryByName = push(this.all, new DeleteCategoryByNameInteractor(this.repository));
    readonly DeleteProduct = push(this.all, new DeleteProductInteractor(this.repository));
    readonly GetAllCategories = push(this.all, new GetAllCategoriesInteractor(this.repository));
    readonly GetAllProducts = push(this.all, new GetAllProductsInteractor(this.repository));
    readonly GetCategory = push(this.all, new GetCategoryInteractor(this.repository));
    readonly GetCategoryByName = push(this.all, new GetCategoryByNameInteractor(this.repository));
    readonly GetProduct = push(this.all, new GetProductInteractor(this.repository));
    readonly GetProductsByName = push(this.all, new GetProductsByNameInteractor(this.repository));
    readonly UpdateProduct = push(this.all, new UpdateProductInteractor(this.repository));
}

export default UseCaseInteractors;
