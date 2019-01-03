import express from 'express';
import { Express } from 'express-serve-static-core';
import UserController from '../controllers/userController';

export default function authenticationRoutes(app: Express) {
    const routeAPI = express.Router();
    const userController = new UserController();

    // Set up the 'login' routes
    routeAPI.route('/login')
        .post(userController.login);

    app.use('/api', routeAPI);
}
