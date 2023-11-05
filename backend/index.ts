import {ExpressApiRouter} from "./routers/ExpressApiRouter"
import {ExpressInteractorsRouter} from "./routers/ExpressInteractorsRouter"
import {MongoDBRepository} from "./repository/MongoDBRepository"
import {ExpressServer} from "./servers/ExpressServer"
import {UseCaseInteractors} from "./interactors/UseCaseInteractors"

const interactors = new UseCaseInteractors(new MongoDBRepository())
const expressApiRouter = ExpressApiRouter(interactors)
const expressInteractorsRouter = ExpressInteractorsRouter(interactors)
const server = new ExpressServer([["/api", expressApiRouter], ["/service", expressInteractorsRouter]])

server.start()
