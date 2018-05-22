import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { PassportStatic } from 'passport';
import UserController from '../controllers/userController';
import User from '../models/user';

export default function setAPIRoutes(app: Express, passport: PassportStatic/* , transporter: Transporter */) {
    const api = express.Router();
    const userController = new UserController();

    // // Set up the 'initial' routes
    // Set up the 'register' routes
    api.route('/register')
        .post(userController.register(/* transporter */));
    // Set up the 'login' routes
    api.route('/login')
        .post(passport.authenticate('local', {
            failureFlash: 'Wrong username or Password',
            failureMessage: 'Wrong username or Password',
            failureRedirect: '/login/error',
        }), userController.login);
    // Set up the 'login Error' routes
    api.route('/login/error')
        .get(userController.loginFails);
    // Set up the 'login Error' routes
    api.route('/isloggedin')
        .get(userController.isLoggedIn);
    // Set up the 'logout' route
    api.route('/logout')
        .get(userController.logout);

    // Routing for users
    api.route('/users')
        .post(userController.getUsersByUsernameOrEmail);

    // Routing for users
    api.route('/contacts')
        .post(userController.getContactsByID);

    // Routing add contact
    api.route('/add')
        .post(userController.addContact);

    // Request for info
    // Set up the 'messages' routes
    app.use('/messages', (req, res, next) => {
        const messages = require('../../db/seed/messages.json');
        res.json(messages);
    });

    // Apply the routes to our application with the prefix /api
    app.use('/', api);
}
