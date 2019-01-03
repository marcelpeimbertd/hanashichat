import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { PassportStatic } from 'passport';
import ConversationController from '../controllers/conversationController';
import UserController from '../controllers/userController';

export default function setAPIRoutes(app: Express, passport: PassportStatic/* , transporter: Transporter */) {
    const api = express.Router();
    const userController = new UserController();
    const conversationController = new ConversationController();

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

    // Routing for Contacts
    api.route('/contacts')
        .post(userController.getContactsByID);

    // Routing for Conversations
    api.route('/conversations')
        .post(conversationController.getConversationsByID);

    // Routing add contact
    api.route('/contact')
        .post(userController.addContact)
        .delete(userController.deleteContact);

    // Conversation
    api.route('/conversation')
        .post(conversationController.createConversation, userController.addConversation);

    // Request for info
    // Set up the 'messages' routes
    api.route('/message')
        .post(conversationController.updateMessage);

    // Apply the routes to our application with the prefix /api
    app.use('/', api);
}
