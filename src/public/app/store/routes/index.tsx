import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedApp, ConnectedChat, ConnectedDashBoard, ConnectedLogin } from '../connections';
import Chat from './../../components/chat';
import Register from './../../components/register';

export default (
    <BrowserRouter>
        <Route render={(props) => (
            <ConnectedApp {...props}>
                <Route exact path="/" render={(props) => (
                    [<div className="top">
                        <div className="leafIcon"></div>
                        <h1 className="title">
                        Ha-nashi Chat <br/>
                        葉-なし チャット
                        </h1>
                    </div>,
                    <ConnectedLogin {...props} />])} />
                <Route path="/login" render={(props) => (
                    [<div className="top">
                        <div className="leafIcon"></div>
                        <h1 className="title">
                        Ha-nashi Chat <br/>
                        葉-なし チャット
                        </h1>
                    </div>,
                    <ConnectedLogin {...props} />])} />
                <Route path="/dashboard/:username?" render={() => <div className="room">
                    <ConnectedDashBoard />
                    <Route path="/dashboard/:username" render={() =>
                        <ConnectedChat />} />
                </div>} />
                <Route path="/register" render={() => <Register prop="" />} />
            </ConnectedApp>
        )} />
    </BrowserRouter>
);
