import {MongoMemoryServer} from "mongodb-memory-server";

const mongodb = new MongoMemoryServer({
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

async function start(): Promise<void> {
    await mongodb.start()
}

start().then(() => {
    console.log("Started Memory MongoDB: " +
        JSON.stringify(mongodb.instanceInfo?.instance?.instanceOpts, null, 4))
}).catch((err) => {
    console.error("Failed to start Memory MongoDB: " + err)
})
