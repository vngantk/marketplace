import {MongoMemoryServer} from "mongodb-memory-server";
import {MongoDBRepository} from "../../backend/repository";
import {UseCaseInteractors} from "../../backend/interactors";
import {UseCastInteractorsTest} from "./UseCaseInteractorsTest";
import mongoose from "mongoose";
import {delay} from "../../common/utils";

const mongodb= new MongoMemoryServer({
    instance: {
        dbName: "Marketplace",
        port: 27017,
        ip: "localhost",
        // storageEngine: "wiredTiger"
    },
    auth: {
        enable: true,
        customRootName: "root",
        customRootPwd: "goodExample"
    }
})

beforeAll(async () => {
    await mongodb.start()
    console.log("Memory MongoDB started: " + JSON.stringify(mongodb.instanceInfo?.instance?.instanceOpts, null, 4));
})

afterAll(async () => {
    await mongoose.disconnect()
    console.log("Connection to MongoDB closed.")
    await mongodb.stop()
    console.log("Memory MongoDB stopped.")
    await delay(1000)
})

describe('Test Use Cases directly with MongoDBRepository', () => {
    UseCastInteractorsTest(new UseCaseInteractors(new MongoDBRepository()))
})

