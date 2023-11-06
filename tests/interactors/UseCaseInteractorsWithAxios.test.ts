import {UseCastInteractorsTest} from "./UseCaseInteractorsTest";
import {AxiosUseCaseInteractors} from "../../common/interactors/AxiosUseCaseInteractors";
import {ExpressInteractorsRouter} from "../../backend/routers"
import {MongoDBRepository} from "../../backend/repository"
import {ExpressServer} from "../../backend/servers"
import {UseCaseInteractors} from "../../backend/interactors"
import {MongoMemoryServer} from "mongodb-memory-server";
import axios from "axios";
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

const interactors = new UseCaseInteractors(new MongoDBRepository())
const expressInteractorsRouter = ExpressInteractorsRouter(interactors)
const server = new ExpressServer([["/service", expressInteractorsRouter]])
const port = 3000


beforeAll(async () => {
    await mongodb.start()
    console.log("Memory MongoDB started: " + JSON.stringify(mongodb.instanceInfo?.instance?.instanceOpts, null, 4));
    server.start(port)
    console.log("Express server started.")
})

afterAll(async () => {
    server.stop()
    console.log("Express server stopped.")
    await mongoose.disconnect()
    console.log("Connection to MongoDB closed.")
    await mongodb.stop()
    console.log("Memory MongoDB stopped.")
    await delay(1000)
})

describe('Test Use Cases remotely with Axios Client', () => {
    UseCastInteractorsTest(new AxiosUseCaseInteractors(axios.create({baseURL: `http://localhost:${port}/service`})))
})

