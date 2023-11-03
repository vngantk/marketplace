import request from "supertest"
import Product from "../../common/entities/Product"
import express from "express"
import mongoose from "mongoose"
import ExpressApiRouter from "./ExpressApiRouter"
import MongoDBRepository from "../repository/MongoDBRepository"
import ExpressInteractorsRouter from "./ExpressInteractorsRouter"
import UseCaseInteractors from "../interactors/UseCaseInteractors"
import ExpressServer from "./ExpressServer"

const sampleProducts: Omit<Product, "id">[] = [
    {
        name: 'iPhone 15',
        description: 'Apple iPhone 15',
        price: 1500,
        quantity: 250,
        category: 'Mobile Phones'
    },
    {
        name: 'iPhone 15 Pro',
        description: 'Apple iPhone 15 Pro',
        price: 1999.95,
        quantity: 150,
        category: 'Mobile Phones'
    },
    {
        name: 'iPhone 14',
        description: 'Apple iPhone 15',
        price: 1119.95,
        quantity: 100,
        category: 'Mobile Phones'
    },
    {
        name: 'iPhone 14 Pro',
        description: 'Apple iPhone 14 Pro',
        price: 1499.95,
        quantity: 50,
        category: 'Mobile Phones'
    },
    {
        name: 'MacBook Pro 13',
        description: 'Apple MacBook Pro 13-inches',
        price: 2000,
        quantity: 100,
        category: 'Computers'
    },
    {
        name: 'MacBook Pro 16',
        description: 'Apple MacBook Pro 16-inches',
        price: 2999.95,
        quantity: 75,
        category: 'Computers'
    }
]

const repository = new MongoDBRepository()
const expressApiService = ExpressApiRouter(repository)
const server = new ExpressServer([["/api", expressApiService]])
const app = server.app

beforeAll(async () => {
    await repository.deleteAllProducts()
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
})

describe('POST /api/products', () => {
    it(`should create ${sampleProducts.length} new products`, async () => {
        for (const product of sampleProducts) {
            const res = await request(app)
                .post('/api/products')
                .send(product)
            expect(res.statusCode).toEqual(201)
        }
    })
})

describe('GET /api/products', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toEqual(200)
        const actualProducts = res.body as Product[]
        expect(actualProducts.length).toEqual(sampleProducts.length)
        for (const product of actualProducts) {
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

describe('GET /api/products/:id', () => {
    it('should fetch the product details by id', async () => {
        const products = await repository.getAllProducts()
        for (const product of products) {
            const res = await request(app).get(`/api/products/${product.id}`)
            expect(res.statusCode).toEqual(200)
            expect({...res.body, _id: undefined}).toEqual({...product, _id: undefined})
        }
    })
})

describe('GET /api/products?name=[kw]', () => {
    it('should fetch products with name containing the given keyword', async () => {
        const res = await request(app).get('/api/products?name=pro');   // with keyword = 'Pro'
        expect(res.statusCode).toEqual(200)
        const products = res.body as Product[]
        expect(products.length).toEqual(4)
        for (const product of products) {
            expect(product.name.toLowerCase()).toContain('pro')
            delete (product as any)['_id']
            delete (product as any)['__v']
            delete (product as any)['id']
        }
        expect(products).toContainEqual(sampleProducts[1]); // iPhone 15 Pro
        expect(products).toContainEqual(sampleProducts[3]); // iPhone 14 Pro
        expect(products).toContainEqual(sampleProducts[4]); // MacBook Pro 13
        expect(products).toContainEqual(sampleProducts[5]); // MacBook Pro 16
    })
})

describe('PUT /api/products/:id', () => {
    it('should update the product details', async () => {
        const products = await repository.getAllProducts()
        for (const product of products) {
            const updatedProduct = <Product> {
                ...product,
                name: product.name,
                description: "** " + product.description + " **",
                price: product.price * 2,
                quantity: product.quantity + 50,
                category: product.category
            }
            const putRes = await request(app)
                .put(`/api/products/${product.id}`)
                .send(updatedProduct)
            expect(putRes.statusCode).toEqual(200)
            const getRes = await request(app).get(`/api/products/${product.id}`)
            expect(getRes.statusCode).toEqual(200)
            expect({...getRes.body, _id: undefined}).toEqual({...updatedProduct, _id: undefined})
        }
    })
})

describe('DELETE /api/products/:id', () => {
    let products: Product[]
    it('should delete the product by ID of the first two products', async () => {
        products = await repository.getAllProducts()
        for (let i = 0; i < 2; i++) {
            const product = products[i]
            const res = await request(app).delete(`/api/products/${product.id}`)
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual("")
        }
    })
    it('should fail to fetch the deleted products', async () => {
        for (let i = 0; i < 2; i++) {
            const product = products[i]
            const res = await request(app).get(`/api/products/${product.id}`)
            expect(res.statusCode).toEqual(404)
        }
    })
    it("should result in 4 products", async () => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(4)
    })
})

describe('DELETE /api/products', () => {
    it('should delete all products', async () => {
        const res = await request(app).delete('/api/products')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual("")
    })
    it ('should result in 0 products', async () => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(0)
    })
})