import React from 'react';
import { Link } from 'react-router-dom';

interface ILoginProps {
    prop: string;
}
class Login extends React.Component<ILoginProps> {
    public render() {
        return <div className="login">
            <form action="/login" method="POST">
                <label htmlFor="iemail">Email:</label>
                <input type="email" name="email" id="iemail" placeholder="leaf@hanashichat.com" />
                <label htmlFor="pass">Password:</label>
                <input type="password" name="password" id="pass" placeholder="Enter Password" />
                <input type="submit" value="LogIn"/>
            </form>
            <Link to="/register">Register</Link>
        </div>;
    }
}
export default Login;
