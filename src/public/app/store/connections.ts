import { connect } from 'react-redux';
import App from '../components/app';
import Chat from '../components/chat';
import DashBoard from '../components/dashboard';
import Login from '../components/login';
import * as reducers from './reducers';

export const ConnectedChat = connect(undefined,
    {
        fetchMessages: reducers.fetchMessagesActionCreator,
    })(Chat);

export const ConnectedApp = connect((state: Store.IAppState) => ({
    user: state.users.user,
}),
    {
        fetchUser: reducers.fetchUserActionCreator,
    })(App);

export const ConnectedLogin = connect(undefined,
    {
        fetchUser: reducers.fetchUserActionCreator,
    })(Login);

export const ConnectedDashBoard = connect((state: Store.IAppState) => ({
    user: state.users.user,
    users: state.users.all,
}),
    {
        fetchUser: reducers.fetchUserActionCreator,
        fetchUsers: reducers.fetchUsersActionCreator,
    })(DashBoard);
