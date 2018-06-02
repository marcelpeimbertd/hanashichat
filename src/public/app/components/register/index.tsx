import axios from 'axios';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './register';

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
        return <div className="register">
            <div className="container">
                <h1 className="titleRegister">Hi next leaf</h1>
                <form className="registerForm" onSubmit={this.sendRegister}>
                    <input type="text" className="fieldRegister"
                        name="username" id="username" placeholder="Enter User Name" min="5" required />
                    <label htmlFor="username" className="fieldRegister labelRegister">UserName</label>
                    <input type="text" className="fieldRegister"
                        name="lastName" id="lastName" placeholder="Enter Last Name" required />
                    <label htmlFor="lastName" className="fieldRegister labelRegister">LastName</label>
                    <input type="text" className="fieldRegister"
                        name="firstName" id="firstName" placeholder="Enter First Name" required />
                    <label htmlFor="firstName" className="fieldRegister labelRegister">FirstName</label>
                    <input type="email" className="fieldRegister"
                        name="email" id="email" placeholder="leaf@hanashichat.com" required />
                    <label htmlFor="registerEmail" className="fieldRegister labelRegister">Email</label>
                    <input type="email" className="fieldRegister"
                        name="confirmEmail" id="confirmEmail" placeholder="leaf@hanashichat.com" required />
                    <label htmlFor="confirmEmail" className="fieldRegister labelRegister">Confirm Email</label>
                    <input type="password" className="fieldRegister"
                        name="password" id="password" placeholder="Enter Password" required />
                    <label htmlFor="registerPass" className="fieldRegister labelRegister">Password</label>
                    <input type="password" className="fieldRegister"
                        name="confirmPass" id="confirmPass" placeholder="Confirm Password" required />
                    <label htmlFor="confirmPass" className="fieldRegister labelRegister">Confirm Password</label>
                    <div className="fieldRegister btns">
                        <div><input type="submit" value="Register" className="btn-submit" /></div>
                        <div><Link to="/login" className="btn-link">LogIn</Link></div>
                    </div>
                </form>
            </div>
        </div>;
    }
}
export default Register;
