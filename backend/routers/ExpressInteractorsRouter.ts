import express, {Router} from "express"
import Repository from "../repository/Repository"
import UseCases from "../../common/usecases/UseCases";
import {Type, UseCase} from "../../common/usecases/UseCase"

function ExpressInteractorsRouter(
    repository: Repository,
    interactors: UseCases | UseCase[]
): Router {

    function execute<Req, Resp>(interactor: UseCase<Req, Resp>, request: Req): Promise<Resp> {
        try {
            return interactor.execute(request)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const router = express.Router()

    for (const interactor of Array.isArray(interactors) ? interactors : (interactors as UseCases).all) {
        console.log(`Service: ${interactor.name}, type: ${interactor.type}`)
        router.post(`/${interactor.name}`, async (req, res) => {
            execute(interactor, req.body).then(result => {
                if (interactor.type == Type.QUERY) {
                    res.status(result === undefined ? 404 : 200).json(result)
                } else if (interactor.type == Type.COMMAND) {
                    res.status(200).json(result)
                } else {
                    res.status(500).json("Unknown interaction type: " + interactor.type)
                }
            }).catch(error => {
                res.status(400).json({error: error.toString()})
            })
        })
    }
    return router
}

export default ExpressInteractorsRouter

