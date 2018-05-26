import axios from 'axios';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

interface IRegisterProps {
    prop: string;
}
interface IRegisterState {
    redirect: string;
}
class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            redirect: '',
        };
    }
    public sendRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const info: { [key: string]: string } = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            username: '',
        };
        const keys = Object.keys(info);
        keys.forEach((key) => {
            info[key] = event.currentTarget[key].value;
        });
        axios.post('register', info)
            .then(({ data }) => {
                if (data.err) {
                    throw data;
                }
                this.setState({ redirect: data.redirect });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return <div>
            <form onSubmit={this.sendRegister}>
                <label htmlFor="username">UserName:</label>
                <input type="text" name="username" id="username" placeholder="Enter User Name" min="5" required />
                <label htmlFor="lastName">LastName:</label>
                <input type="text" name="lastName" id="lastName" placeholder="Enter Last Name" required />
                <label htmlFor="firstName">FirstName:</label>
                <input type="text" name="firstName" id="firstName" placeholder="Enter First Name" required />
                <label htmlFor="registerEmail">Email:</label>
                <input type="email" name="email" id="email" placeholder="leaf@hanashichat.com" required />
                <label htmlFor="confirmEmail">Confirm Email:</label>
                <input type="email" name="confirmEmail" id="confirmEmail" placeholder="leaf@hanashichat.com" required />
                <label htmlFor="registerPass">Password:</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" required />
                <label htmlFor="confirmPass">Confirm Password:</label>
                <input type="password" name="confirmPass" id="confirmPass" placeholder="Confirm Password" required />
                <input type="submit" value="Register" />
            </form>
            <Link to="/login">LogIn</Link>
        </div>;
    }
}
export default Register;
