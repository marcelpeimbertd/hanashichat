import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import { MongoError, ObjectId } from 'mongodb';
import Conversation from '../models/conversation';
import Controller from './abstractController';

type MongooseError = MongoError & { errors: { [index: string]: { message: string } } };
export default class ConversationController extends Controller {
    public model = Conversation;

    public createConversation: RequestHandler = (req, res, next) => {
        if (req.user) {
            Conversation.find({
                participants: {
                    $all: req.body.conversation.participants,
                },
            }, (err: MongooseError, conversations: Base.IConversation[]) => {
                if (conversations.length) {
                    const conversation = conversations.find((conv) =>
                        conv.participants.every((participant: Store.IParticipant) =>
                            req.body.conversation.participants.some((
                                same: Store.IParticipant) => participant.id.toString() === same.id)));

                    if (conversation) {
                        req.body.conversation = conversation;
                        req.body.id = (conversation as Base.IConversation & { id: ObjectId }).id;
                    }
                    return next();
                } else {
                    const conversation = new Conversation(req.body.conversation);
                    conversation.save((err: MongooseError) => {
                        // If an error occurs, use flash messages to report the error
                        if (err) {
                            const message = 'conversation not saved';
                            const failureMessage = {
                                err,
                                message,
                                status: 0,
                            };

                            // Redirect the user back to the signup page
                            return res.send(JSON.stringify(failureMessage));
                        }
                        const successMessage = {
                            conversation,
                            status: 1,
                        };
                        req.body.conversation = conversation;
                        req.body.id = conversation.id;
                        next();
                    });
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
    // sending conversations info
    public getConversationsByID: RequestHandler = (req, res) => {
        if (req.user) {
            const user = req.user;
            const queryContacts = user.conversations.map((_id: ObjectId) => ({ _id }));
            Conversation.find({ $or: queryContacts }, (err, conversations) => {
                if (err) {
                    const ErrorMessage = {
                        err,
                        message: 'Conversations Not match',
                        status: 0,
                    };
                    return res.send(JSON.stringify(ErrorMessage));
                }
                if (conversations) {
                    const results = conversations.map((conversation) => (
                        this.getConversationFields((conversation as Store.IConversation))));
                    const successMessage = {
                        conversations: results,
                        status: 1,
                    };
                    return res.send(JSON.stringify(successMessage));
                } else {
                    const notContactsMessage = {
                        message: 'Conversations Not match',
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
    // Update Messages
    public updateMessage: RequestHandler = (req, res) => {
        const current = req.body.newMessage;
        const newPrevious = req.body.current;
        Conversation.findById(req.body.conversationID, (err, conversation) => {
            if (err) {
                const ErrorMessage = {
                    err,
                    message: 'Conversations Not match',
                    status: 0,
                };
                return res.send(JSON.stringify(ErrorMessage));
            }
            if (conversation) {
                conversation.messages.current = current;
                if (newPrevious) {
                    conversation.messages.previous.push(newPrevious);
                }
                conversation.save((err: MongoError) => {
                    if (err) {
                        const ErrorMessage = {
                            err,
                            message: 'Conversations Not match',
                            status: 0,
                        };
                        return res.send(JSON.stringify(ErrorMessage));
                    }
                    const results = this.getConversationFields((conversation as Store.IConversation));
                    const successMessage = {
                        conversation: results,
                        status: 1,
                    };
                    return res.send(JSON.stringify(successMessage));
                });

            }
        });
    }

    // Get the conversation fields
    private getConversationFields({ id, messages, participants }: Store.IConversation) {
        return {
            id, messages, participants,
        };
    }
}
