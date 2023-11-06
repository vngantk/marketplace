import {AddCategory} from "./AddCategory";
import {AddProduct} from "./AddProduct";
import {DeleteAllCategories} from "./DeleteAllCategories";
import {DeleteAllProducts} from "./DeleteAllProducts";
import {DeleteCategory} from "./DeleteCategory";
import {DeleteCategoryByName} from "./DeleteCategoryByName";
import {DeleteProduct} from "./DeleteProduct";
import {GetAllCategories} from "./GetAllCategories";
import {GetAllProducts} from "./GetAllProducts";
import {GetCategory} from "./GetCategory";
import {GetCategoryByName} from "./GetCategoryByName";
import {GetProduct} from "./GetProduct";
import {GetProductsByName} from "./GetProductsByName";
import {UpdateProduct} from "./UpdateProduct";
import {UseCase} from "./UseCase";

export interface UseCaseCollection {
    readonly AddCategory: AddCategory;
    readonly AddProduct: AddProduct;
    readonly DeleteAllCategories: DeleteAllCategories;
    readonly DeleteAllProducts: DeleteAllProducts;
    readonly DeleteCategory: DeleteCategory;
    readonly DeleteCategoryByName: DeleteCategoryByName;
    readonly DeleteProduct: DeleteProduct;
    readonly GetAllCategories: GetAllCategories;
    readonly GetAllProducts: GetAllProducts;
    readonly GetCategory: GetCategory;
    readonly GetCategoryByName: GetCategoryByName;
    readonly GetProduct: GetProduct;
    readonly GetProductsByName: GetProductsByName;
    readonly UpdateProduct: UpdateProduct;
    readonly all: UseCase[];
}
