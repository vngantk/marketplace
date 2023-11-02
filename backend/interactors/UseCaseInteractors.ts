import {Repository} from "../repository/Repository";
import Product from "../../common/entities/Product";
import Category from "../../common/entities/Category";

import {GetProduct, GetProductUseCase} from "../../common/usecases/GetProduct";
import {GetAllProducts, GetAllProductsUseCase} from "../../common/usecases/GetAllProducts";
import {GetProductsByNamePattern, GetProductsByNamePatternUseCase} from "../../common/usecases/GetProductsByNamePattern";
import {AddProduct, AddProductUseCase} from "../../common/usecases/AddProduct";
import {DeleteProduct, DeleteProductUseCase} from "../../common/usecases/DeleteProduct";
import {UpdateProduct, UpdateProductUseCase} from "../../common/usecases/UpdateProduct";
import {GetCategory, GetCategoryUseCase} from "../../common/usecases/GetCategory";
import {GetAllCategories, GetAllCategoriesUseCase} from "../../common/usecases/GetAllCategories";
import {AddCategory, AddCategoryUseCase} from "../../common/usecases/AddCategory";
import {DeleteCategory, DeleteCategoryUseCase} from "../../common/usecases/DeleteCategory";
import {DeleteAllProductsUseCase} from "../../common/usecases/DeleteAllProducts";

class GetProductInteractor extends GetProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(query: GetProduct): Promise<Product | undefined> {
        return this.repository.getProduct(query.id);
    }
}

class GetAllProductsInteractor extends GetAllProductsUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(query: GetAllProducts): Promise<Product[]> {
        return this.repository.getAllProducts();
    }
}

class GetProductsByNamePatternInteractor extends GetProductsByNamePatternUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(query: GetProductsByNamePattern): Promise<Product[]> {
        return this.repository.getProductsByNamePattern(query.pattern);
    }
}

class AddProductInteractor extends AddProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(command: AddProduct): Promise<void> {
        return this.repository.addProduct(command).then();
    }
}

class DeleteProductInteractor extends DeleteProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(command: DeleteProduct): Promise<void> {
        return this.repository.deleteProduct(command.id).then();
    }
}

class UpdateProductInteractor extends UpdateProductUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(command: UpdateProduct): Promise<void> {
        return this.repository.updateProduct(command.id, command).then();
    }
}

class DeleteAllProductsInteractor extends DeleteAllProductsUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(): Promise<void> {
        return this.repository.deleteAllProducts().then();
    }
}

class GetCategoryInteractor extends GetCategoryUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(query: GetCategory): Promise<Category | undefined> {
        return this.repository.getCategory(query.name);
    }
}

class GetAllCategoriesInteractor extends GetAllCategoriesUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(query: GetAllCategories): Promise<Category[]> {
        return this.repository.getAllCategories();
    }
}

class AddCategoryInteractor extends AddCategoryUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(command: AddCategory): Promise<void> {
        return this.repository.addCategory(command).then();
    }
}

class DeleteCategoryInteractor extends DeleteCategoryUseCase {
    constructor(readonly repository: Repository) {
        super();
    }
    override execute(command: DeleteCategory): Promise<void> {
        return this.repository.deleteCategory(command.name).then();
    }
}

export class UseCaseInteractors {
    constructor(readonly repository: Repository) {}
    readonly GetProduct: GetProductInteractor = new GetProductInteractor(this.repository);
    readonly GetAllProducts: GetAllProductsInteractor = new GetAllProductsInteractor(this.repository);
    readonly GetProductsByNamePattern: GetProductsByNamePatternInteractor = new GetProductsByNamePatternInteractor(this.repository);
    readonly AddProduct: AddProductInteractor = new AddProductInteractor(this.repository);
    readonly DeleteProduct: DeleteProductInteractor = new DeleteProductInteractor(this.repository);
    readonly UpdateProduct: UpdateProductInteractor = new UpdateProductInteractor(this.repository);
    readonly DeleteAllProducts: DeleteAllProductsInteractor = new DeleteAllProductsInteractor(this.repository);
    readonly GetCategory: GetCategoryInteractor = new GetCategoryInteractor(this.repository);
    readonly GetAllCategories: GetAllCategoriesInteractor = new GetAllCategoriesInteractor(this.repository);
    readonly AddCategory: AddCategoryInteractor = new AddCategoryInteractor(this.repository);
    readonly DeleteCategory: DeleteCategoryInteractor = new DeleteCategoryInteractor(this.repository);
}

export default UseCaseInteractors;
