import express from 'express';

export default class ViewsRouter extends express.Router {
    constructor({ ViewController }) {
        super();
        this.get('/chat', [], ViewController.getChat);

        this.get('/', [], ViewController.login);

        this.get('/cart', [], ViewController.getCart);

        this.get('/products', [], ViewController.getProducts);

        /* this.get("/realtimeproducts", ViewController.getRealTimeProducts); */

        this.get('/register', [], ViewController.registerUser);

        this.get('/usercenter', [], ViewController.getUserCenter);

        this.get('/admin', [], ViewController.getAdminCenter);

        this.get('/admin/update/', [], ViewController.getUpdateProduct);

        this.get('/failed', [], ViewController.getError);
    }
}
