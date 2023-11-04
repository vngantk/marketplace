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

export class UseCaseInteractors implements UseCases {
    constructor(readonly repository: Repository) {}
    readonly all: UseCase[] = [];
    readonly AddCategory = this.add(new AddCategoryInteractor(this.repository));
    readonly AddProduct = this.add(new AddProductInteractor(this.repository));
    readonly DeleteAllCategories = this.add(new DeleteAllCategoriesInteractor(this.repository));
    readonly DeleteAllProducts = this.add(new DeleteAllProductsInteractor(this.repository));
    readonly DeleteCategory = this.add(new DeleteCategoryInteractor(this.repository));
    readonly DeleteCategoryByName = this.add(new DeleteCategoryByNameInteractor(this.repository));
    readonly DeleteProduct = this.add(new DeleteProductInteractor(this.repository));
    readonly GetAllCategories = this.add(new GetAllCategoriesInteractor(this.repository));
    readonly GetAllProducts = this.add(new GetAllProductsInteractor(this.repository));
    readonly GetCategory = this.add(new GetCategoryInteractor(this.repository));
    readonly GetCategoryByName = this.add(new GetCategoryByNameInteractor(this.repository));
    readonly GetProduct = this.add(new GetProductInteractor(this.repository));
    readonly GetProductsByName = this.add(new GetProductsByNameInteractor(this.repository));
    readonly UpdateProduct = this.add(new UpdateProductInteractor(this.repository));

    private add <T extends UseCase>(interactor: T): T {
        this.all.push(interactor);
        return interactor;
    }
}

export default UseCaseInteractors;
