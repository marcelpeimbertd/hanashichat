import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Action } from 'redux-actions';
import './login';

interface ILoginProps {
    fetchUser: (t1: Store.IUserPayload) => Action<Store.IUserPayload>;
}
interface ILoginState {
    redirect: string;
}
class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            redirect: '',
        };
    }
    public sendLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const info: { [key: string]: string } = {
            password: '',
            username: '',
        };
        const keys = Object.keys(info);
        keys.forEach((key) => {
            info[key] = event.currentTarget[key].value;
        });
        axios.post('login', info)
            .then(({ data }) => {
                if (data.err) {
                    throw data;
                }
                this.props.fetchUser({ user: data.user });
                this.setState({ redirect: data.redirect });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return <div className="login">
            <form className="loginForm" action="/login" method="POST" onSubmit={this.sendLogin}>
                <input type="username" className="field"
                    name="username" id="username" placeholder="Enter your user name" />
                <label htmlFor="username" className="field label">UserName</label>
                <input type="password" className="field"
                    name="password" id="password" placeholder="Enter Password" />
                <label htmlFor="password" className="field label">Password</label>
                <div className="field">
                <div><input type="submit" value="LogIn" className="btn-submit" /></div>
                    <div><Link to="/register" className="btn-link">Register</Link></div>
                </div>
            </form>
        </div>;
    }
}
export default Login;
