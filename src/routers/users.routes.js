import express from 'express';
import multer from 'multer';
import isAuthenticated from '../middleware/auth.middleware.js';

export default class UsersRouter extends express.Router {
    constructor({ UserController }) {
        super();
        const upload = multer({ dest: 'uploads/' });

        this.post('/', [], UserController.createUser);
        this.get('/:email', [isAuthenticated], UserController.getUser);
        // TODO: Add the route to update the user's role
        this.put('/premium/:uid', [isAuthenticated], UserController.updateUserRole);
        // TODO: Add other necessary routes, e.g., for updating the user's password
        this.post('/:uid/documents', [isAuthenticated, upload.array('documents', 10)], UserController.uploadDocuments);
    }
}


