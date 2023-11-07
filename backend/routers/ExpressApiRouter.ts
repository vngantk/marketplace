import express, {Router} from 'express';
import {AddCategoryCommand, AddProductCommand, UpdateProductCommand} from "../../common/usecases";
import {UseCaseInteractors} from "../interactors";

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

    router.post<any, any, any, AddProductCommand>('/products', (req, res) => {
        const request = req.body
        interactors.AddProduct.execute(request)
            .then(() => res.status(201).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.put<any, any, any, UpdateProductCommand>('/products/:id', (req, res) => {
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

    router.get('/categories', (req, res, next) => {
        const name = req.query["name"] as string | undefined
        if (name !== undefined) {
            interactors.GetCategoryByName.execute({name: name})
                .then(category => res.status(200).json(category))
                .catch(error => res.status(400).json({error: error.message}))
        } else next()
    })

    router.get('/categories', (req, res) => {
        interactors.GetAllCategories.execute({})
            .then(categories => res.status(200).json(categories))
            .catch(error => res.status(400).json({error: error.message}))
    })

    router.get('/categories/:id', (req, res) => {
        const id = req.params.id;
        interactors.GetCategory.execute({id: id})
            .then(category => {
                if (category === undefined || category === null) {
                    res.status(404).json({error: `Category with id ${id} not found`});
                } else {
                    res.status(200).json(category);
                }
            })
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.post<any, any, any, AddCategoryCommand>('/categories', (req, res) => {
        const request = req.body
        interactors.AddCategory.execute(request)
            .then(() => res.status(201).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.delete('/categories/:id', (req, res) => {
        const id = req.params.id;
        interactors.DeleteCategory.execute({id: id})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    router.delete('/categories', (req, res) => {
        interactors.DeleteAllCategories.execute({})
            .then(() => res.status(200).json())
            .catch(error => res.status(400).json({error: error.message}));
    });

    return router;
}


