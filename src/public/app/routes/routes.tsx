import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IDashBoardProps } from '../components/dashboard';
import { ILoginProps } from '../components/login';
import { ConnectedChat, ConnectedDashBoard, ConnectedLogin, ConnectedRoot } from '../store/connections';
import Register from './../components/register';
import { IRootProps } from './../components/root/index';
import Language from './../components/Settings/lenguage';

export default (
    <BrowserRouter>
        <Route render={(propsRoot: any & IRootProps) => (
            <ConnectedRoot {...propsRoot}>
                <Route exact path="/" render={(propsLogin: any & ILoginProps) => (
                    [<Language />,
                    <div className="top">
                        <div className="leafIcon"></div>
                        <h1 className="title">
                            Ha-nashi Chat <br />
                            葉-なし チャット
                        </h1>
                    </div>,
                    <ConnectedLogin {...propsLogin} />])} />
                <Route path="/login" render={(propsLogin2: any & ILoginProps) => (
                    [<Language />,
                    <div className="top">
                        <div className="leafIcon"></div>
                        <h1 className="title">
                            Ha-nashi Chat <br />
                            葉-なし チャット
                        </h1>
                    </div>,
                    <ConnectedLogin {...propsLogin2} />])} />
                <Route path="/dashboard/:username?"
                    render={(propsBoard: any & IDashBoardProps) => <div className="room">
                        <ConnectedDashBoard {...propsBoard} />
                        <Route path="/dashboard/:username" render={(propsChat) =>
                            <ConnectedChat {...propsChat} />} />
                    </div>} />
                <Route path="/register" render={() => <Register prop="" />} />
            </ConnectedRoot>
        )} />
    </BrowserRouter>);
