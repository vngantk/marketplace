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
    readonly array: readonly UseCase[];
    readonly map: ReadonlyMap<UseCaseCollectionKeys, UseCase>;
}

export type UseCaseCollectionKeys = keyof Omit<UseCaseCollection, "array" | "map">

export function getUseCaseArray(collection: UseCaseCollection): readonly UseCase[] {
    return Object.getOwnPropertyNames(collection).filter((name) => {
        if (name !== "array" && name !== "map") {
            const property = (collection as any)[name]
            return property != undefined
                && property.name !== undefined
                && property.name === name
                && (property.type === "query" || property.type === "command")
        }
        return false
    }).map((name) => (collection as any)[name])
}

export function getUseCaseMap(collection: UseCaseCollection): ReadonlyMap<UseCaseCollectionKeys, UseCase> {
    return new Map<UseCaseCollectionKeys, UseCase>(getUseCaseArray(collection).map((useCase) => {
        return [useCase.name as UseCaseCollectionKeys, useCase]
    }))
}
