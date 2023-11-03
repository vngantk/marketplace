import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import DeleteAllCategories from "./DeleteAllCategories";
import DeleteAllProducts from "./DeleteAllProducts";
import DeleteCategory from "./DeleteCategory";
import DeleteCategoryByName from "./DeleteCategoryByName";
import DeleteProduct from "./DeleteProduct";
import GetAllCategories from "./GetAllCategories";
import GetAllProducts from "./GetAllProducts";
import GetCategory from "./GetCategory";
import GetCategoryByName from "./GetCategoryByName";
import GetProduct from "./GetProduct";
import GetProductsByName from "./GetProductsByName";
import UpdateProduct from "./UpdateProduct";
import {UseCase} from "./UseCase";

export interface UseCases {
    readonly AddCategory: AddCategory.UseCase;
    readonly AddProduct: AddProduct.UseCase;
    readonly DeleteAllCategories: DeleteAllCategories.UseCase;
    readonly DeleteAllProducts: DeleteAllProducts.UseCase;
    readonly DeleteCategory: DeleteCategory.UseCase;
    readonly DeleteCategoryByName: DeleteCategoryByName.UseCase;
    readonly DeleteProduct: DeleteProduct.UseCase;
    readonly GetAllCategories: GetAllCategories.UseCase;
    readonly GetAllProducts: GetAllProducts.UseCase;
    readonly GetCategory: GetCategory.UseCase;
    readonly GetCategoryByName: GetCategoryByName.UseCase;
    readonly GetProduct: GetProduct.UseCase;
    readonly GetProductsByName: GetProductsByName.UseCase;
    readonly UpdateProduct: UpdateProduct.UseCase;
    readonly all: UseCase[];
}

export default UseCases;
