import React from 'react';

interface ILoginProps {
    prop: string;
}
class Register extends React.Component<ILoginProps> {
    public sendRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(event.currentTarget.dataset);
    }
    public render() {
        return <div>
            <form onSubmit={this.sendRegister}>
                <label htmlFor="userName">FullName:</label>
                <input type="text" name="" id="userName" placeholder="Enter Full Name" required />
                <label htmlFor="registerEmail">Email:</label>
                <input type="email" name="" id="registerEmail" placeholder="leaf@hanashichat.com" required />
                <label htmlFor="confirmEmail">Confirm Email:</label>
                <input type="email" name="" id="confirmEmail" placeholder="leaf@hanashichat.com" required />
                <label htmlFor="registerPass">Password:</label>
                <input type="password" name="" id="registerPass" placeholder="Enter Password" required />
                <label htmlFor="confirmPass">Confirm Password:</label>
                <input type="password" name="" id="confirmPass" placeholder="Confirm Password" required />
                <input type="submit" value="Register"/>
            </form>
        </div>;
    }
}
export default Register;
