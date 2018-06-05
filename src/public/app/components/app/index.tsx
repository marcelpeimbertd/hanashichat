import axios from 'axios';
import React from 'react';
import { RouteProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { Action } from 'redux-actions';
import './app';
import { IAppProps } from './index';

export interface IAppProps extends RouteProps {
    user: Store.IUser;
    users: Store.IUsers;
    fetchUser: (t1: Store.IUserPayload) => Action<Store.IUserPayload>;
}

interface IAppState {
    isfetch: boolean;
    isLogged: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            isLogged: false,
            isfetch: false,
        };
    }
    public componentDidMount() {
        this.isLoggedIn();
    }
    public componentWillReceiveProps(nextProps: IAppProps) {
        if (nextProps.user.email && !this.state.isLogged) {
            this.setState({
                isLogged: true,
                isfetch: true,
            });
        }
    }
    public isLoggedIn() {
        if (!this.props.user.email) {
            axios.get('/isloggedin')
                .then(({ data }) => {
                    if (data.err) {
                        throw data;
                    }
                    if (data.user) {
                        this.props.fetchUser(data);
                        this.setState({
                            isLogged: true,
                            isfetch: true,
                        });
                    } else {
                        this.setState({
                            isLogged: false,
                            isfetch: true,
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                        isLogged: false,
                        isfetch: true,
                    });
                    console.error(error);
                });
        }
    }
    public render() {
        const path = this.props.location ? this.props.location.pathname : '/login';
        if (!this.state.isfetch) {
            return <h1>Loading ...</h1>;
        }
        if (!this.state.isLogged && path !== '/login' && path !== '/register') {
            return <Redirect to="/login" />;
        }
        return <div className="app">
            {this.props.children}
        </div>;
    }
}
export default App;
