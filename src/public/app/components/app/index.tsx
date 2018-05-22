import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Action } from 'redux-actions';

export interface IAppProps {
    user: Store.IUser;
    fetchUser: (t1: Store.IUserPayload) => Action<Store.IUserPayload>;
}

class App extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props);
    }
    public componentDidMount() {
        this.isLoggedIn();
    }
    public isLoggedIn() {
        if (!this.props.user.email) {
            axios.get('isloggedin')
                .then(({ data }) => {
                    if (data.err) {
                        throw data;
                    }
                    if (data.user) {
                        this.props.fetchUser({user: data.user});
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    public render() {
        return this.props.children;
    }
}
export default App;
