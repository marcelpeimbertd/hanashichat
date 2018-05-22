import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Action } from 'redux-actions';

interface ILoginProps {
    fetchUser: (t1: Store.IUserPayload) => Action<Store.IUserPayload>;
}
class Login extends React.Component<ILoginProps> {
    constructor(props: ILoginProps) {
        super(props);
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
                window.location.assign(data.redirect);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    public render() {
        return <div className="login">
            <form action="/login" method="POST" onSubmit={this.sendLogin}>
                <label htmlFor="username">UserName:</label>
                <input type="username" name="username" id="username" placeholder="Enter your user name" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" />
                <input type="submit" value="LogIn" />
            </form>
            <Link to="/register">Register</Link>
        </div>;
    }
}
export default Login;
