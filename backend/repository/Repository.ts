import {Product} from "../../common/entities/Product";
import {Category} from "../../common/entities/Category";

export interface Repository {

    getProduct(id: string): Promise<Product | undefined>;

    getProductsByName(name: string): Promise<Product[]>;

    getProductsByNamePattern(pattern: string): Promise<Product[]>;

    getAllProducts(): Promise<Product[]>;


    addProduct(product: Omit<Product, "id">): Promise<Product>;

    updateProduct(id: string, productPartial: Partial<Product>): Promise<Product>;

    deleteProduct(id: string): Promise<number>;

    deleteAllProducts(): Promise<number>;


    getCategory(id: string): Promise<Category | undefined>;

    getCategoryByName(name: string): Promise<Category | undefined>;

    getAllCategories(): Promise<Category[]>;

    addCategory(category: Omit<Category, "id">): Promise<Category>;

    deleteCategory(id: string): Promise<number>;

    deleteCategoryByName(name: string): Promise<number>;

    deleteAllCategories(): Promise<number>;
}

export default Repository;
