import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedDashBoard, ConnectedLogin, ConnectedApp } from '../connections';
import Chat from './../../components/chat';
import Register from './../../components/register';

// development
const getMessages = require;
const messages = getMessages('../../../../../db/seed/messages.json');
const conversation = getMessages('../../../../../db/seed/conversations.json');

export default (
    <BrowserRouter>
        <Route render={(props) => (
            <ConnectedApp {...props}>
                <Route exact path="/" render={(props) =>
                    <ConnectedLogin {...props} />} />
                <Route path="/login" render={(props) => <ConnectedLogin {...props} />} />
                <Route path="/chat" render={() => <Chat messages={messages} />} />
                <Route path="/register" render={() => <Register prop="" />} />
                <Route path="/dashboard" render={(props) => <ConnectedDashBoard  {...props} />} />
            </ConnectedApp>
        )} />
    </BrowserRouter>
);
