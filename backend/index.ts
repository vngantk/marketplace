import {ExpressApiRouter, ExpressInteractorsRouter} from "./routers"
import {MongoDBRepository} from "./repository"
import {ExpressServer} from "./servers"
import {UseCaseInteractors} from "./interactors"

const interactors = new UseCaseInteractors(new MongoDBRepository())
const expressApiRouter = ExpressApiRouter(interactors)
const expressInteractorsRouter = ExpressInteractorsRouter(interactors)
const server = new ExpressServer([["/api", expressApiRouter], ["/service", expressInteractorsRouter]])

server.start()
