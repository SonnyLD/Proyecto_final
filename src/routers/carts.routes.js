import express from 'express';

export default class CartsRouter extends express.Router {
    constructor({ CartController }) {
        super();
        this.post('/', [], CartController.createCart);
        this.put('/:cartID/', [], CartController.updateCart);
        this.put(
            '/:cartID/product/:productID',
            [],
            CartController.updateQuantity
        );
        this.post(
            '/:cartID/product/:productID',
            [],
            CartController.addProductToCart
        );
        this.delete('/:cartID', [], CartController.deleteCart);
        this.delete(
            '/:cartID/product/:productID',
            [],
            CartController.deleteProductFromCart
        );
        this.get('/getCartID', [], CartController.getCartID);
    }
}
