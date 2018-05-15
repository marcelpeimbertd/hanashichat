import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import { MongoError } from 'mongodb';
import User from '../models/user';
import Controller from './abstractController';

type MongooseError = MongoError & { errors: { [index: string]: { message: string } } }
export default class UserController extends Controller {
    public model = User;

    // Create a new controller method that log in a 'regular' users
    public login: RequestHandler = (req, res) => {
        if (req.user) {
            res.send(JSON.stringify(req.user));
        }
        // Redirect the user back to the main application page
        res.send('login');
    }

    // Create a new controller method that creates new 'regular' users
    public register: (/* transporter: Transporter */) => RequestHandler = (/* transporter */) =>
        (req, res, next) => {
            // If user is not connected,
            // create and login a new user,
            // otherwise redirect the user back to the main application page
            if (!req.user) {
                // Create a new 'User' model instance
                const user = new User(req.body);
                user.comments = '';
                var message = null;

                // Set the user provider property
                user.provider = 'local';

                // Try saving the new user document
                user.save((err: MongooseError) => {
                    // If an error occurs, use flash messages to report the error
                    if (err) {
                        // Use the error handling method to get the error message
                        var message = this.getErrorMessage(err);
                        // Set the flash messages
                        req.flash('error', message);

                        // Redirect the user back to the signup page
                        return res.redirect('/signup');
                    }

                    /* transporter.sendMail({
                        subject: 'Confirmacion a uaglia8830.invitationapp.tk',
                        text: 'url with code for verification',
                        to: user.email,
                    }); */
                    // If the user was created successfully use the Passport 'login' method to login
                    req.login(user, function (err) {
                        // If a login error occurs move to the next middleware
                        if (err) { return console.log(err); }

                        // Redirect the user back to the main application page
                        return res.redirect('/board');
                    });
                });
            } else {
                return res.redirect('/signin');
            }
        }
    // Create a new controller method for signing out
    public signout: RequestHandler = (req, res) => {
        // Use the Passport 'logout' method to logout
        req.logout();
        // Redirect the user back to the main application page
        res.redirect('/signin');
    }
    // Create a new controller method for forgot Pass
    public forgotPass: (transporter: Transporter) => RequestHandler = (transporter) =>
        (req, res) => {
            User.findOne({ username: req.body.username })
                .then((user) => {
                    if (user) {
                        transporter.sendMail({
                            subject: 'Link para resetear el password',
                            text: 'url with code for resetPass',
                            to: user.email,
                        });

                        // Redirect the user back to the main application page
                        res.redirect('/signin');
                    }
                });
        }
    // Create a new controller method for send role
    public sendRole: RequestHandler = (req, res) => {
        if (req.user) {
            res.send(req.user.role.toString());
        }
    }
    // Create a new controller method for send users
    public sendUsers: RequestHandler = (req, res) => {
        if (req.user) {
            User.find()
                .then((Users) => {
                    const users = Users.map((user) => {
                        const { firstName, lastName, visits, confirmation: {
                            current: { status } },
                            fee: {
                                current: { ammout } } } = user;
                        return { firstName, lastName, visits, confirmation: status, fee: ammout };
                    });
                    res.send(users);
                })
                .catch((err) => {
                    // If an error occurs, use flash messages to report the error
                    if (err) {
                        // Use the error handling method to get the error message
                        var message = this.getErrorMessage(err);
                        // Set the flash messages
                        req.flash('error', message);

                        // Redirect the user back to the signup page
                        return res.send('Error');
                    }
                });
        }
    }
    // Create a new error handling controller method
    private getErrorMessage = function ({ code, errors }: MongooseError) {
        const error = errors ? Object.values(errors).find((value) => !!value.message)
            : undefined;
        return code
            ? (code === 11000 || code === 11001)
                ? 'Username already exists' : 'Something went wrong'
            : error ? error.message : 'Something is bad in the code';
    };
}
