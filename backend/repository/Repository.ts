import {Product} from "../../common/entities/Product";
import {Category} from "../../common/entities/Category";

export abstract class Repository {

    abstract getProduct(id: string): Promise<Product | undefined>;

    abstract getProductsByName(name: string): Promise<Product[]>;

    abstract getProductsByNamePattern(pattern: string): Promise<Product[]>;

    abstract getProductsByCategory(category: string): Promise<Product[]>;

    abstract getAllProducts(): Promise<Product[]>;


    abstract addProduct(product: Product): Promise<Product>;

    abstract updateProduct(id: string, productPartial: Partial<Product>): Promise<Product>;

    abstract deleteProduct(id: string): Promise<number>;


    abstract getCategory(id: string): Promise<Category | undefined>;

    abstract getCategoryByName(name: string): Promise<Category | undefined>;

    abstract getCategoriesByNamePattern(pattern: string): Promise<Category[]>;

    abstract getAllCategories(): Promise<Category[]>;

    abstract addCategory(category: Category): Promise<Category>;

    abstract deleteCategory(id: string): Promise<number>;

    abstract deleteCategoryByName(name: string): Promise<number>;


    abstract deleteAllProducts(): Promise<number>;

    abstract deleteAllCategories(): Promise<number>;
}

export default Repository;
