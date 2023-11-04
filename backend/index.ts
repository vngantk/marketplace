import ExpressApiRouter from "./routers/ExpressApiRouter"
import ExpressInteractorsRouter from "./routers/ExpressInteractorsRouter"
import MongoDBRepository from "./repository/MongoDBRepository"
import ExpressServer from "./servers/ExpressServer"
import UseCaseInteractors from "./interactors/UseCaseInteractors"
import {MongoMemoryServer} from "mongodb-memory-server";
import Category from "../common/entities/Category";
import Product from "../common/entities/Product";

const mongodb = new MongoMemoryServer({
    instance: {dbName: "Marketplace", port: 27017, ip: "localhost"},
    auth: {enable: true, customRootName: "root", customRootPwd: "goodExample"}
})

mongodb.start().then(() => {
    console.log("Memory MongoDB started: " + JSON.stringify(mongodb.instanceInfo?.instance?.instanceOpts, null, 4));
})

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
const expressApiRouter = ExpressApiRouter(interactors)
const expressInteractorsRouter = ExpressInteractorsRouter(interactors)
const server = new ExpressServer([["/api", expressApiRouter], ["/service", expressInteractorsRouter]])

async function loadSampleData(): Promise<void> {
    for (const category of sampleCategories) {
        await interactors.AddCategory.execute(category)
    }
    for (const product of sampleProducts) {
        await interactors.AddProduct.execute(product)
    }
    server.start()
}

loadSampleData().then(() => {
    console.log("Sample data loaded.")
}).catch((error) => {
    console.error("Error loading sample data: " + error)
})

