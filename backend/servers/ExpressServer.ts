import express, {Express, Router, Request, Response, NextFunction} from "express";
import http from "http";
import morgan from "morgan"
import cors from "cors";

export class ExpressServer {

    constructor(readonly services: [path: string, service: Router][]) {
        this.init();
    }

    public readonly app: Express = express();

    public get isRunning(): boolean {
        return this.httpServer !== undefined;
    }

    private httpServer: http.Server | undefined;

    protected init() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morgan('dev'));
        this.app.use(logErrors)
        this.app.use(errorHandler)
        this.app.get("/", (req, res) => {
            res.status(200).json({message: "Welcome to Marketplace"});
        });
        for (const [path, service] of this.services) {
            this.app.use(path, service);
        }
    }

    public start(port: number = 3000) {
        if (this.httpServer) {
            console.warn("Server already started");
        }
        this.httpServer = this.app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        });
    }

    public stop() {
        if (this.httpServer) {
            this.httpServer.close();
            this.httpServer = undefined;
        }
    }
}

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack)
    next(err)
}

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({ error: err.message })
}

export default ExpressServer;
