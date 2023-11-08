import {Category, Product} from "../../common/entities";

/**
 * This interface is an abstraction for data access. This interface is not a
 * general purpose data access interface, but rather it is tailored to the needs
 * of the application. The main purpose of this interface is to decouple
 * the application logic from the actual technology used for the data layer.
 * This interface is used primarily by the use case interactors to
 * implement the business logic of the application.
 *
 * This interface only addresses the need to access data. It does not address
 * data integrity and consistency at the business level. They are the
 * responsibility of the use case interactors. For example, adding a product
 * of a non-existing category is not an error at the data access level, but
 * it is an error at the business level and is handled by the use case
 * interactors. The same applies to deleting a category that is still referenced
 * by some products.
 *
 * This interface is not meant to be used across application tiers. So,
 * its methods do not conform to the CQRS principles. For example, the
 * addProduct() method returns a Product object. All methods of this
 * interface return promises, so they are asynchronous.
 */
export interface Repository {

    /**
     * Returns a product with the given id, or undefined if not found.
     * @param id
     */
    getProduct(id: string): Promise<Product | undefined>;

    /**
     * Returns all products with the given name, or en empty array if no
     * products match the name.
     * @param name
     */
    getProductsByName(name: string): Promise<Product[]>;

    /**
     * Returns all products whose name matches the given pattern, or an empty
     * array if no products match the pattern.
     * @param pattern
     */
    getProductsByNamePattern(pattern: string): Promise<Product[]>;

    /**
     * Returns all products with the given category, or an empty array if no
     * @param category
     */
    getProductsByCategory(category: string): Promise<Product[]>;

    /**
     * Returns all products, or an empty array if no products exist.
     */
    getAllProducts(): Promise<Product[]>;

    /**
     * Adds a product to the repository and returns the added product. The id
     * of the added product is set by the repository.
     * @param product
     */
    addProduct(product: Omit<Product, "id">): Promise<Product>;

    /**
     * Updates the product with the given id and returns the updated product.
     * Partial updates are supported. The id of the product cannot be updated.
     * @param id
     * @param productPartial
     */
    updateProduct(id: string, productPartial: Partial<Omit<Product, "id">>): Promise<Product>;

    /**
     * Deletes the product with the given id and returns the number of deleted
     * products (0 or 1).
     * @param id
     */
    deleteProduct(id: string): Promise<number>;

    /**
     * Deletes all products and returns the number of deleted products.
     */
    deleteAllProducts(): Promise<number>;


    /**
     * Returns a category with the given id, or undefined if not found.
     * @param id
     */
    getCategory(id: string): Promise<Category | undefined>;

    /**
     * Returns a category with the given name, or undefined if not found.
     * @param name
     */
    getCategoryByName(name: string): Promise<Category | undefined>;

    /**
     * Returns all categories, or an empty array if no categories exist.
     */
    getAllCategories(): Promise<Category[]>;

    /**
     * Adds a category to the repository and returns the added category. The id
     * of the added category is set by the repository.
     * @param category
     */
    addCategory(category: Omit<Category, "id">): Promise<Category>;

    /**
     * Deletes the category with the given id and returns the number of deleted
     * categories (0 or 1).
     * @param id
     */
    deleteCategory(id: string): Promise<number>;

    /**
     * Deletes the category with the given name and returns the number of deleted
     * categories (0 or 1).
     * @param name
     */
    deleteCategoryByName(name: string): Promise<number>;

    /**
     * Deletes all categories and returns the number of deleted categories.
     */
    deleteAllCategories(): Promise<number>;
}


