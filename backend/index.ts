import ExpressApiRouter from "./routers/ExpressApiRouter"
import ExpressInteractorsRouter from "./routers/ExpressInteractorsRouter"
import MongoDBRepository from "./repository/MongoDBRepository"
import ExpressServer from "./servers/ExpressServer"
import UseCaseInteractors from "./interactors/UseCaseInteractors"

const repository = new MongoDBRepository()
const expressApiService = ExpressApiRouter(repository)
const expressDynamicService = ExpressInteractorsRouter(repository, new UseCaseInteractors(repository))
const server = new ExpressServer([["/api", expressApiService], ["/service", expressDynamicService]])
server.start()
