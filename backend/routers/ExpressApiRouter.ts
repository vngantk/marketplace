import express, {Router} from 'express';
import AddProduct from "../../common/usecases/AddProduct";
import UpdateProduct from "../../common/usecases/UpdateProduct";
import UseCaseInteractors from "../interactors/UseCaseInteractors";

export function ExpressApiRouter(interactors: UseCaseInteractors): Router {

    const router = express.Router();

    router.get('/products', (req, res, next) => {
        const name = req.query["name"] as string | undefined
        if (name !== undefined) {
            interactors.GetProductsByName.execute({name: name, exactMatch: false})
                .then(products => res.status(200).json(products))
                .catch(error => res.status(400).json({error: error.message}))
        } else next()
    })

    router.get('/products', (req, res) => {
        interactors.GetAllProducts.execute({})
            .then(products => res.status(200).json(products))
            .catch(error => res.status(400).json({error: error.message}))
    })

    router.get('/products/:id', (req, res) => {
        const id = req.params.id;
        interactors.GetProduct.execute({id: id})
            .then(product => {
                if (product === undefined || product === null) {
                    res.status(404).json({error: `Product with id ${id} not found`});
                } else {
                    res.status(200).json(product);
                }
            })
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.post<any, any, any, AddProduct.Command>('/products', (req, res) => {
        const request = req.body
        interactors.AddProduct.execute(request)
            .then(() => res.status(201).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.put<any, any, any, UpdateProduct.Command>('/products/:id', (req, res) => {
        const id = req.params.id;
        const request = req.body;
        interactors.UpdateProduct.execute({...request, id: id})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).json({error: error.message}))
    });

    router.delete('/products/:id', (req, res) => {
        const id = req.params.id;
        interactors.DeleteProduct.execute({id: id})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.delete('/products', (req, res) => {
        interactors.DeleteAllProducts.execute({})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    return router;
}

export default ExpressApiRouter;
