import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedApp, ConnectedChat, ConnectedDashBoard, ConnectedLogin } from '../connections';
import Chat from './../../components/chat';
import Register from './../../components/register';

export default (
    <BrowserRouter>
        <Route render={(props) => (
            <ConnectedApp {...props}>
                <Route exact path="/" render={(props) =>
                    <ConnectedLogin {...props} />} />
                <Route path="/login" render={(props) => <ConnectedLogin {...props} />} />
                <Route path="/dashboard/:username?" render={() => <div>
                    <ConnectedDashBoard />
                    <Route path="/dashboard/:username" render={() =>
                        <ConnectedChat />} />
                </div>} />
                <Route path="/register" render={() => <Register prop="" />} />
            </ConnectedApp>
        )} />
    </BrowserRouter>
);
