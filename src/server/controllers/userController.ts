import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import { MongoError } from 'mongodb';
import User from '../models/user';
import Controller from './abstractController';
import { user } from './../../public/app/store/reducers';

type MongooseError = MongoError & { errors: { [index: string]: { message: string } } }
export default class UserController extends Controller {
    public model = User;

    // Create a new controller method that log in a 'regular' users
    public login: RequestHandler = (req, res) => {
        if (req.user) {
            const successMessage = {
                redirect: '/dashboard',
                status: 1,
                user: this.getUserFields((req.user as Store.IUser)),
            };
            res.send(JSON.stringify(successMessage));
        } else {
            // Redirect the user back to the main application page
            res.redirect('error');
        }
    }
    // Create a new controller method that log in a 'regular' users
    public loginFails: RequestHandler = (req, res) => {
        const err = req.flash('error');
        const failureMessage = {
            err,
            message: err[0],
            status: 0,
        };
        res.send(JSON.stringify(failureMessage));
    }
    // Create a new controller method that check if user is logged
    public isLoggedIn: RequestHandler = (req, res) => {
        let redirect = req.baseUrl;
        if (req.user) {
            redirect = redirect !== '/' ? redirect : '/dashboard';
            const successMessage = {
                redirect,
                status: 1,
                user: this.getUserFields((req.user as Store.IUser)),
            };
            res.send(JSON.stringify(successMessage));
        } else {
            redirect = redirect !== '/' ? redirect : '/login';
            const notLoggedMessage = {
                redirect,
                status: 0,
            };
            res.send(JSON.stringify(notLoggedMessage));
        }
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
                // var message = null;

                // Set the user provider property
                user.provider = 'local';

                // Try saving the new user document
                user.save((err: MongooseError) => {
                    // If an error occurs, use flash messages to report the error
                    if (err) {
                        // Use the error handling method to get the error message
                        const message = this.getErrorMessage(err);
                        // Set the flash messages
                        req.flash('error', message);

                        const failureMessage = {
                            err,
                            message,
                            status: 0,
                        };

                        // Redirect the user back to the signup page
                        return res.send(JSON.stringify(failureMessage));
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
                        const successMessage = {
                            redirect: '/dashboard',
                            status: 1,
                            userid: user.id,
                        };
                        // Redirect the user back to the main application page
                        return res.send(JSON.stringify(successMessage));
                    });
                });
            } else {
                const successMessage = {
                    redirect: '/dashboard',
                    status: 1,
                    userid: req.user.id,
                };
                return res.send(JSON.stringify(successMessage));
            }
        }
    // Create a new controller method for signing out
    public logout: RequestHandler = (req, res) => {
        // Use the Passport 'logout' method to logout
        req.logout();
        const successMessage = {
            redirect: 'login',
            status: 0,
            userid: '',
        };
        // Redirect the user back to the main application page
        res.send(JSON.stringify(successMessage));
    }
    // Create a new controller method for forgot Pass
    public forgotPass: (/* transporter: Transporter */) => RequestHandler = (/* transporter */) =>
        (req, res) => {
            User.findOne({ username: req.body.username })
                .then((user) => {
                    if (user) {
                        /*  transporter.sendMail({
                             subject: 'Link para resetear el password',
                             text: 'url with code for resetPass',
                             to: user.email,
                         }); */

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
                        const { firstName, lastName } = user;
                        return { firstName, lastName };
                    });
                    res.send(users);
                })
                .catch((err) => {
                    // If an error occurs, use flash messages to report the error
                    if (err) {
                        // Use the error handling method to get the error message
                        const message = this.getErrorMessage(err);
                        // Set the flash messages
                        req.flash('error', message);

                        // Redirect the user back to the signup page
                        return res.send('Error');
                    }
                });
        }
    }
    // Create a new controller methid for get users by username o email
    public getUsersByUsernameOrEmail: RequestHandler = (req, res) => {
        if (req.body.looking) {
            const looking = new RegExp(`.*${req.body.looking}.*`, 'i');
            User.find({ $or: [{ username: looking }, { email: looking }] }, (err, users) => {
                if (err) {
                    const ErrorMessage = {
                        err,
                        message: 'Users Not match',
                        status: 0,
                    };
                    return res.send(JSON.stringify(ErrorMessage));
                }
                if (users) {
                    const results = users.map((user) => this.getUserFields((user as Store.IUser)));
                    const successMessage = {
                        redirect: '/dashboard',
                        status: 1,
                        users: results,
                    };
                    return res.send(JSON.stringify(successMessage));
                } else {
                    const notUsersMessage = {
                        message: 'Users Not match',
                        status: 0,
                    };
                    res.send(JSON.stringify(notUsersMessage));
                }
            });
        } else {
            const notSearchMessage = {
                message: 'no info to search',
                status: 0,
            };
            res.send(JSON.stringify(notSearchMessage));
        }
    }

    // sending contacts info
    public getContactsByID: RequestHandler = (req, res) => {
        if (req.user) {
            const user = req.user;
            const queryContacts = user.contacts.map((id: string) => ({ id }));
            User.find({ $or: queryContacts }, (err, contacts) => {
                if (err) {
                    const ErrorMessage = {
                        err,
                        message: 'Users Not match',
                        status: 0,
                    };
                    return res.send(JSON.stringify(ErrorMessage));
                }
                if (contacts) {
                    const results = contacts.map((contact) => this.getUserFields((contact as Store.IUser)));
                    const successMessage = {
                        contacts: results,
                        redirect: '/dashboard',
                        status: 1,
                        user,
                    };
                    return res.send(JSON.stringify(successMessage));
                } else {
                    const notContactsMessage = {
                        message: 'Contacts Not match',
                        status: 0,
                    };
                    res.send(JSON.stringify(notContactsMessage));
                }
            });
        } else {
            const notLoggedMessage = {
                message: 'no user logged',
                status: 0,
            };
            res.send(JSON.stringify(notLoggedMessage));
        }
    }
    // adding new contacts
    public addContact: RequestHandler = (req, res) => {
        if (req.user) {
            const user = req.user;
            const isRepeated = user.contacts.some((contactid: string) => {
                return contactid === req.body.id;
            });
            if (isRepeated) {
                const failureMessage = {
                    message: 'contact already exists',
                    status: 0,
                };
                // Redirect the user back to the signup page
                return res.send(JSON.stringify(failureMessage));
            } else {
                user.contacts.push(req.body.id);
                user.save((err: MongooseError) => {
                    // If an error occurs, use flash messages to report the error
                    if (err) {
                        // Use the error handling method to get the error message
                        const message = this.getErrorMessage(err);
                        // Set the flash messages
                        req.flash('error', message);

                        const failureMessage = {
                            err,
                            message,
                            status: 0,
                        };

                        // Redirect the user back to the signup page
                        return res.send(JSON.stringify(failureMessage));
                    }
                    const successMessage = {
                        status: 1,
                        user: this.getUserFields((user as Store.IUser)),
                    };
                    res.send(JSON.stringify(successMessage));
                });
            }
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
    // Get the user fields
    private getUserFields({ id, contacts, conversations, email,
        firstName, lastName, username }: Store.IUser) {
        return {
            contacts, conversations, email,
            firstName, id, lastName, username,
        };
    }
}
