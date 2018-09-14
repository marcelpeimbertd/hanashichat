import { connect } from 'react-redux';
import Chat from '../components/chat';
import DashBoard from '../components/dashboard';
import Login from '../components/login';
import Root from '../components/root';
import { fetchConversation, fetchUser, fetchUsers } from './actions';
import { initialStateConversation, initialStateUsers } from './reducers';

const initialStateRoot = {
    conversation: initialStateConversation,
    users: initialStateUsers,
};

export const ConnectedChat = connect((state: Store.IRootState = initialStateRoot) => ({
    conversation: state.conversation!.current,
    user: state.users!.user,
}),
    {
        fetchConversation,
    })(Chat);

export const ConnectedRoot = connect((state: Store.IRootState = initialStateRoot) => ({
    user: state.users!.user,
}),
    {
        fetchUser,
    })(Root);

export const ConnectedLogin = connect(undefined,
    {
        fetchUser,
    })(Login);

export const ConnectedDashBoard = connect((state: Store.IRootState = initialStateRoot) => ({
    // update: state.conversation.update,
    user: state.users!.user,
    users: state.users!.all,
}),
    {
        fetchConversation,
        fetchUser,
        fetchUsers,
    })(DashBoard);
