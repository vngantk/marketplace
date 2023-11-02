import express, {Router} from 'express';
import {Repository} from "../repository/Repository";
import {UseCaseInteractors} from "../interactors/UseCaseInteractors";
import {AddProduct} from "../../common/usecases/AddProduct";
import {UpdateProduct} from "../../common/usecases/UpdateProduct";

export function ExpressApiService(repository: Repository): Router {
    const interactor = new UseCaseInteractors(repository);
    const router = express.Router();

    router.get('/products', (req, res) => {
        const name = req.query["name"] as string | undefined
        if (name) {
            interactor.GetProductsByNamePattern.execute({pattern: name})
                .then(products => res.status(200).json(products))
        } else {
            interactor.GetAllProducts.execute({})
                .then(products => res.status(200).json(products))
        }
    })

    router.get('/products/:id', (req, res) => {
        const id = req.params.id;
        interactor.GetProduct.execute({id: id})
            .then(product => {
                if (product === undefined || product === null) {
                    res.status(404).json({message: `Product with id ${id} not found`});
                } else {
                    res.status(200).json(product);
                }
            });
    });

    router.post<any, any, void, AddProduct>('/products', (req, res) => {
        const request = req.body
        interactor.AddProduct.execute(request)
            .then(() => res.status(201).json())
            .catch(error => res.status(400).send(error.message));
    });

    router.put<any, any, void, UpdateProduct>('/products/:id', (req, res) => {
        const id = req.params.id;
        const request = req.body;
        interactor.UpdateProduct.execute({...request, id: id})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).send(error.message))
    });

    router.delete('/products/:id', (req, res) => {
        const id = req.params.id;
        interactor.DeleteProduct.execute({id: id})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).send(error.message));
    });

    router.delete('/products', (req, res) => {
        interactor.DeleteAllProducts.execute()
            .then(() => res.status(200).json())
            .catch(error => res.status(400).send(error.message));
    });

    return router;
}

export default ExpressApiService;
