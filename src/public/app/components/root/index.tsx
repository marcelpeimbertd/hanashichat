import axios from 'axios';
import React from 'react';
import { RouteProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { Action } from 'redux-actions';
import { connectIO } from '../../socketio/config';
import './root';

export interface IRootProps extends RouteProps {
    user: Store.IUser;
    users: Store.IUsers;
    fetchUser: (user: Store.IUser) => Action<Store.IUserPayload>;
}

interface IRootState {
    isfetch: boolean;
    isLogged: boolean;
}

class Root extends React.Component<IRootProps, IRootState> {
    constructor(props: IRootProps) {
        super(props);
        this.state = {
            isLogged: false,
            isfetch: false,
        };
    }
    public componentDidMount() {
        this.isLoggedIn();
    }
    public componentWillReceiveProps(nextProps: IRootProps) {
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
                        connectIO();
                        this.props.fetchUser(data.user);
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
        return <div className="root">
            {this.props.children}
        </div>;
    }
}
export default Root;
