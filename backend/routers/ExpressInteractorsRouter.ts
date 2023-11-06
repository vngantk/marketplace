import express, {Router} from "express"
import {UseCase, UseCaseCollection} from "../../common/usecases"

export function ExpressInteractorsRouter(interactors: UseCaseCollection | UseCase[]): Router {

    const router = express.Router()

    function execute<Req, Resp>(interactor: UseCase<Req, Resp>, request: Req): Promise<Resp> {
        try {
            return interactor.execute(request)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    for (const interactor of Array.isArray(interactors) ? interactors : (interactors as UseCaseCollection).all) {
        console.log(`Setup route for interactor: ${interactor.name}, type: ${interactor.type}`)
        router.post(`/${interactor.type}/${interactor.name}`, async (req, res) => {
            execute(interactor, req.body).then(result => {
                if (interactor.type === "query") {
                    res.status(result === undefined ? 404 : 200).json(result)
                } else if (interactor.type === "command") {
                    res.status(200).json(result)
                } else {
                    res.status(500).json({error: "Unknown interaction type: " + interactor.type})
                }
            }).catch(error => {
                res.status(400).json({error: error.toString()})
            })
        })
    }
    return router
}



