import {Category, Product} from "../common/entities";
import {UseCaseInteractors} from "./interactors";
import {MongoDBRepository} from "./repository";
import mongoose from "mongoose";

const sampleCategories: Omit<Category, "id">[] = [
    {name: 'Mobile Phones'},
    {name: 'Computers'},
    {name: 'Cars'}
]

const sampleProducts: Omit<Product, "id">[] = [
    {name: 'iPhone 15', description: 'Apple iPhone 15', price: 1500, quantity: 250, category: 'Mobile Phones'},
    {name: 'iPhone 15 Pro', description: 'Apple iPhone 15 Pro', price: 1999.95, quantity: 150, category: 'Mobile Phones'},
    {name: 'iPhone 14', description: 'Apple iPhone 15', price: 1119.95, quantity: 100, category: 'Mobile Phones'},
    {name: 'iPhone 14 Pro', description: 'Apple iPhone 14 Pro', price: 1499.95, quantity: 50, category: 'Mobile Phones'},
    {name: 'MacBook Pro 13', description: 'Apple MacBook Pro 13-inches', price: 2000, quantity: 100, category: 'Computers'},
    {name: 'MacBook Pro 16', description: 'Apple MacBook Pro 16-inches', price: 2999.95, quantity: 75, category: 'Computers'}
]

const interactors = new UseCaseInteractors(new MongoDBRepository())

async function start() {
    console.log("Loading sample data...")
    for (const category of sampleCategories) {
        await interactors.AddCategory.execute(category)
    }
    for (const product of sampleProducts) {
        await interactors.AddProduct.execute(product)
    }
    const categories = await interactors.GetAllCategories.execute({})
    console.log("Loaded categories: ")
    console.dir(categories)

    const products = await interactors.GetAllProducts.execute({})
    console.log("Loaded products: ")
    console.dir(products)

    try {
        await mongoose.disconnect()
        console.log("Disconnected from MongoDB")
    } catch (err) {
        console.error("Failed to disconnect from MongoDB: " + err)
    }
}

start().then(() => {
    console.log("Loaded sample data.")
}).catch((err) => {
    console.error("Failed to load sample data: " + err)
})
