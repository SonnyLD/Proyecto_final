import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export default class IndexRouter extends express.Router {
    constructor({
        ProductsRouter,
        CartsRouter,
        UsersRouter,
        ViewsRouter,
        PassportRouter,
        GithubRouter,
    }) {
        super();

        // Set other mids
        this.use(express.json());
        this.use(express.urlencoded({ extended: true }));
        this.use(cors());
        // this.use(helmet()); needs to be configured to allow axios and other front end scripts

        // Set router for each path
        this.use('/api/products', ProductsRouter);
        this.use('/api/carts', CartsRouter);
        this.use('/api/users', UsersRouter);
        this.use('/', ViewsRouter);
        this.use('/api/passport', PassportRouter);
        this.use('/api/github', GithubRouter);
    }
}
