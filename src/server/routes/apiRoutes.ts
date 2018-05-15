import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { PassportStatic } from 'passport';
import UserController from '../controllers/userController';
import User from '../models/user';

export default function setAPIRoutes(app: Express, passport: PassportStatic/* , transporter: Transporter */) {
    const api = express.Router();
    const userController = new UserController();

    // // Set up the 'initial' routes
    // Set up the 'signup' routes
    api.route('/register')
        .post(userController.register(/* transporter */));
    // Set up the 'signin' routes
    api.route('/login')
        .post(/* passport.authenticate('local'), */ userController.login);
    // Set up the 'signout' route
    api.get('/signout', userController.signout);

    // Request for info
    // Set up the 'messages' routes
    app.use('/messages', (req, res, next) => {
        const messages = require('../../db/seed/messages.json');
        res.json(messages);
    });

    // Apply the routes to our application with the prefix /api
    app.use('/', api);
}
