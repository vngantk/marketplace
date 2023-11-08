import {UpdateProductCommand, UseCaseCollection} from "../../common/usecases";
import {Category, Product} from "../../common/entities"

export const sampleCategories: Omit<Category, "id">[] = [
    {name: 'Mobile Phones'},
    {name: 'Computers'},
    {name: 'Cars'}
]

export const sampleProducts: Omit<Product, "id">[] = [
    {name: 'iPhone 15', description: 'Apple iPhone 15', price: 1500, quantity: 250, category: 'Mobile Phones'},
    {name: 'iPhone 15 Pro', description: 'Apple iPhone 15 Pro', price: 1999.95, quantity: 150, category: 'Mobile Phones'},
    {name: 'iPhone 14', description: 'Apple iPhone 15', price: 1119.95, quantity: 100, category: 'Mobile Phones'},
    {name: 'iPhone 14 Pro', description: 'Apple iPhone 14 Pro', price: 1499.95, quantity: 50, category: 'Mobile Phones'},
    {name: 'MacBook Pro 13', description: 'Apple MacBook Pro 13-inches', price: 2000, quantity: 100, category: 'Computers'},
    {name: 'MacBook Pro 16', description: 'Apple MacBook Pro 16-inches', price: 2999.95, quantity: 75, category: 'Computers'}
]

export function UseCastInteractorsTest(interactors: UseCaseCollection){

    beforeAll(async () => {
        console.log("Deleting all products and categories")
        await interactors.DeleteAllProducts.invoke({})
        await interactors.DeleteAllCategories.invoke({})
        console.log("Deleted all products and categories")
    })

    /*
     * Note: The sequence of the following test cases is important because there are dependencies among them.
     */
    describe('AddCategory', () => {
        it("should add a new category for each sample category", async () => {
            for (const category of sampleCategories) {
                expect(await interactors.AddCategory.invoke(category)).toBeUndefined()
            }
        })
        it(`should result in ${sampleCategories.length} categories added`, async () => {
            expect(await interactors.GetAllCategories.invoke({})).toHaveLength(sampleCategories.length)
        })
    });

    describe('AddProduct', () => {
        it("should add a new product for each sample product", async () => {
            for (const product of sampleProducts) {
                expect(await interactors.AddProduct.invoke(product)).toBeUndefined()
            }
            const products = await interactors.GetAllProducts.invoke({})
            expect(products.length).toEqual(sampleProducts.length)
        })
        it(`should result in ${sampleProducts.length} products added`, async () => {
            const products = await interactors.GetAllProducts.invoke({})
            expect(products.length).toEqual(sampleProducts.length)
        })
    });

    describe('GetAllProducts', () => {
        it("should return all products", async () => {
            const products = await interactors.GetAllProducts.invoke({})
            expect(products).toHaveLength(sampleProducts.length)
            for (const product of products) {
                expect(sampleProducts).toContainEqual({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    category: product.category
                })
            }
        })
    })

    describe('GetProduct', () => {
        it("should return a product by id", async () => {
            const products = await interactors.GetAllProducts.invoke({})
            for (const product of products) {
                expect(await interactors.GetProduct.invoke({id: product.id})).toEqual(product)
            }
        })
        it("should return undefined for an invalid id", async () => {
            expect(await interactors.GetProduct.invoke({id: "invalid"})).toBeUndefined()
        })
    })

    describe('GetProductsByName', () => {
        it("should return products with name matching 'pro'", async () => {
            const proProducts = [
                sampleProducts[1],
                sampleProducts[3],
                sampleProducts[4],
                sampleProducts[5]
            ]
            const products = await interactors.GetProductsByName.invoke({name: "pro", exactMatch: false})
            expect(products).toHaveLength(4)
            for (const product of products) {
                expect(proProducts).toContainEqual({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    category: product.category
                })
            }
        })
        it("should return products with name matching 'mac'", async () => {
            const proProducts = [
                sampleProducts[4],
                sampleProducts[5]
            ]
            const products = await interactors.GetProductsByName.invoke({name: "mac", exactMatch: false})
            expect(products).toHaveLength(2)
            for (const product of products) {
                expect(proProducts).toContainEqual({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    category: product.category
                })
            }
        })
        it("should not return any products with name matching 'XXX'", async () => {
            expect(await interactors.GetProductsByName.invoke({name: "XXX", exactMatch: false})).toHaveLength(0)
        })
    })

    describe('UpdateProduct', () => {
        it("should update the product details", async () => {
            const products = await interactors.GetAllProducts.invoke({})
            for (const product of products) {
                const command = <UpdateProductCommand>{
                    id: product.id,
                    description: "** " + product.description + " **",
                    price: product.price * 2,
                }
                expect(await interactors.UpdateProduct.invoke(command)).toBeUndefined()
                expect(await interactors.GetProduct.invoke({id: product.id})).toEqual({
                    ...product,
                    description: "** " + product.description + " **",
                    price: product.price * 2
                })
            }
        })
    })

    describe('DeleteProduct', () => {
        it("should delete a product by id", async () => {
            const products = await interactors.GetAllProducts.invoke({})
            expect(await interactors.DeleteProduct.invoke({id: products[0].id})).toBeUndefined()
            expect(await interactors.GetProduct.invoke({id: products[0].id})).toBeUndefined()
        })
        it(`should result in ${sampleCategories.length - 1} products`, async () => {
            expect(await interactors.GetAllProducts.invoke({})).toHaveLength(sampleProducts.length - 1)
        })
    })

    describe('DeleteAllProducts', () => {
        it("should delete all products", async () => {
            expect(await interactors.DeleteAllProducts.invoke({}))
            expect(await interactors.GetAllProducts.invoke({})).toHaveLength(0)
        })
    })


    describe('GetAllCategories', () => {
        it("should return all categories", async () => {
            const categories = await interactors.GetAllCategories.invoke({})
            expect(categories.length).toEqual(sampleCategories.length)
            for (const category of categories) {
                expect(sampleCategories).toContainEqual({name: category.name})
            }
        })
    })

    describe('GetCategory', () => {
        it("should return a category by id", async () => {
            const categories = await interactors.GetAllCategories.invoke({})
            for (const category of categories) {
                expect(await interactors.GetCategory.invoke({id: category.id})).toEqual(category)
            }
        })
        it("should return undefined for an invalid id", async () => {
            expect(await interactors.GetCategory.invoke({id: "invalid"})).toBeUndefined()
        })
    })

    describe('GetCategoryByName', () => {
        it("should return the category with name equal to 'Mobile Phones'", async () => {
            const category = await interactors.GetCategoryByName.invoke({name: "Mobile Phones"})
            expect(category).toBeDefined()
            expect({name: category!.name}).toEqual(sampleCategories[0])
        })
        it("should not return a category with name equal to 'TV'", async () => {
            expect(await interactors.GetCategoryByName.invoke({name: "TV"})).toBeUndefined()
        })
    })

    describe('DeleteCategory', () => {
        let carsCategory: Category
        it("should delete a category by id", async () => {
            const categories: Category[] = await interactors.GetAllCategories.invoke({})
            carsCategory = categories.find(category => category.name === "Cars") as Category
            expect(carsCategory).toBeDefined()
            expect(await interactors.DeleteCategory.invoke({id: carsCategory!.id})).toBeUndefined()
        })
        it("should fail to fetch the deleted category by ID", async () => {
            expect(await interactors.GetCategory.invoke({id: carsCategory!.id})).toBeUndefined()
        })
        it("should fail to fetch the deleted category by name", async () => {
            expect(await interactors.GetCategoryByName.invoke({name: "Cars"})).toBeUndefined()
        })
        it(`should result in ${sampleCategories.length - 1} categories`, async () => {
            expect(await interactors.GetAllCategories.invoke({})).toHaveLength(sampleCategories.length - 1)
        })
    })

    describe('DeleteAllCategories', () => {
        it("should delete all categories", async () => {
            expect(await interactors.DeleteAllCategories.invoke({})).toBeUndefined()
            expect(await interactors.GetAllCategories.invoke({})).toHaveLength(0)
        })
    })
}
