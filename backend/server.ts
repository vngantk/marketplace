import express, {Express} from "express";
import mongoose from "mongoose";
import ExpressApiService from "./service/ExpressApiService";
import MongoDBRepository from "./repository/MongoDBRepository";
import Repository from "./repository/Repository";
import bodyParser from "body-parser";

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const mongodbOptions = {
    dbName: process.env.MONGODB_NAME || 'Marketplace',
    user: process.env.MONGODB_USER || 'root',
    pass: process.env.MONGODB_PASS || 'goodExample'
}

export interface Server {
    app: Express;
    repository: Repository;
}

export function defaultRepository(): Repository {
    mongoose.connect(mongodbUrl, mongodbOptions).then(() => {
        console.log('Connected to MongoDB');
    });
    return new MongoDBRepository(mongoose)
}

export function start(
    port: number = 3000,
    repository: Repository| undefined = undefined
): Server {
    repository = repository || defaultRepository();
    const app = express();
    const apiService = ExpressApiService(repository);
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.get("/", (req, res) => {
        res.status(200).json({message: "Welcome to the Marketplace API"});
    });
    app.use('/api', apiService);
    app.listen(port, () => console.log(`Server started on port ${port}`));
    return {app, repository};
}

start();
