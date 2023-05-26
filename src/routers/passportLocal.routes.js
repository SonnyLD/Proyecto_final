import express from 'express';
import passport from 'passport';

export default class PassportRouter extends express.Router {
    constructor({ PassportController }) {
        super();
        this.get('/failed', PassportController.fail);
        this.post(
            '/signup',
            [
                passport.authenticate('signup', {
                    failureRedirect: '/failed',
                }),
            ],
            PassportController.signUp
        );
        this.post(
            '/login',
            [
                passport.authenticate('login', {
                    failureRedirect: '/failed',
                }),
            ],
            PassportController.login
        );
        this.post('/logout', [], PassportController.logout);
    }
}
