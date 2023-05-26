import express from 'express';
import passport from 'passport';

export default class GithubRouter extends express.Router {
    constructor() {
        super();
        this.get('/failed', [], (req, res) => {
            console.log('error');
            res.render('error', { error: 'something went wrong' });
        });
        this.get(
            '/login',
            [passport.authenticate('github', { scope: ['user:email'] })],
            (req, res) => {
                res.redirect('/');
            }
        );
        this.get(
            '/callback',
            [
                passport.authenticate('github', {
                    failureRedirect: '/api/github/failed',
                }),
            ],
            (req, res) => {
                res.redirect('/');
            }
        );
    }
}
