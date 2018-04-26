import React from 'react';
import { Link } from 'react-router-dom';

interface ILoginProps {
    prop: string;
}
class Login extends React.Component<ILoginProps> {
    public render() {
        return <div>
            <form action="">
                <label htmlFor="iemail">Email:</label>
                <input type="email" name="" id="iemail" placeholder="leaf@hanashichat.com" />
                <label htmlFor="pass">Password:</label>
                <input type="password" name="" id="pass" placeholder="Enter Password" />
                <Link to="/register">Register</Link>
            </form>
        </div>;
    }
}
export default Login;
