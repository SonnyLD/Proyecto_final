import express from 'express';

export default class ProductsRouter extends express.Router {
    constructor({ ProductController }) {
        super();
        this.get('/', [], ProductController.getProducts);
        this.get('/:productID', [], ProductController.getProduct);
        this.post('/', [], ProductController.createProduct);
        this.put('/:productID', [], ProductController.updateProduct);
        this.delete('/:productID', [], ProductController.deleteProduct);
    }
}
