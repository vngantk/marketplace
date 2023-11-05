import {AddCategoryUseCase} from "./AddCategory";
import {AddProductUseCase} from "./AddProduct";
import {DeleteAllCategoriesUseCase} from "./DeleteAllCategories";
import {DeleteAllProductsUseCase} from "./DeleteAllProducts";
import {DeleteCategoryUseCase} from "./DeleteCategory";
import {DeleteCategoryByNameUseCase} from "./DeleteCategoryByName";
import {DeleteProductUseCase} from "./DeleteProduct";
import {GetAllCategoriesUseCase} from "./GetAllCategories";
import {GetAllProductsUseCase} from "./GetAllProducts";
import {GetCategoryUseCase} from "./GetCategory";
import {GetCategoryByNameUseCase} from "./GetCategoryByName";
import {GetProductUseCase} from "./GetProduct";
import {GetProductsByNameUseCase} from "./GetProductsByName";
import {UpdateProductUseCase} from "./UpdateProduct";
import {UseCase} from "./UseCase";

export * from "./AddCategory";
export * from "./AddProduct";
export * from "./DeleteAllCategories";
export * from "./DeleteAllProducts";
export * from "./DeleteCategory";
export * from "./DeleteCategoryByName";
export * from "./DeleteProduct";
export * from "./GetAllCategories";
export * from "./GetAllProducts";
export * from "./GetCategory";
export * from "./GetCategoryByName";
export * from "./GetProduct";
export * from "./GetProductsByName";
export * from "./UpdateProduct";
export * from "./UseCase";

export interface UseCases {
    readonly AddCategory: AddCategoryUseCase;
    readonly AddProduct: AddProductUseCase;
    readonly DeleteAllCategories: DeleteAllCategoriesUseCase;
    readonly DeleteAllProducts: DeleteAllProductsUseCase;
    readonly DeleteCategory: DeleteCategoryUseCase;
    readonly DeleteCategoryByName: DeleteCategoryByNameUseCase;
    readonly DeleteProduct: DeleteProductUseCase;
    readonly GetAllCategories: GetAllCategoriesUseCase;
    readonly GetAllProducts: GetAllProductsUseCase;
    readonly GetCategory: GetCategoryUseCase;
    readonly GetCategoryByName: GetCategoryByNameUseCase;
    readonly GetProduct: GetProductUseCase;
    readonly GetProductsByName: GetProductsByNameUseCase;
    readonly UpdateProduct: UpdateProductUseCase;
    readonly all: UseCase[];
}

