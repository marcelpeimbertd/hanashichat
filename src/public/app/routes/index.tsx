import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from '../components/chat';
import Login from '../components/login';
import DashBoard from './../components/dashboard';
import Register from './../components/register';

// development
const getMessages = require;
const messages = getMessages('../../../../db/seed/messages.json');
const conversation = getMessages('../../../../db/seed/conversations.json');
const sendMessage = (message: string) => undefined;

export default (
    <BrowserRouter>
        <div>
            <Route exact path="/" render={() =>
                <Login prop="" />} />
            <Route path="/login" render={() => <Login prop="" />} />
            <Route path="/chat" render={() => <Chat messages={messages} />} />
            <Route path="/register" render={() => <Register prop="" />} />
            <Route path="/dashboard" render={() => <DashBoard prop="" />} />
        </div>
    </BrowserRouter>
);
