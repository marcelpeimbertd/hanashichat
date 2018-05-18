import { connect } from 'react-redux';
import App from '../components/app';
import Chat from '../components/chat';
import Login from '../components/login';
import * as reducers from './reducers';

// export const ConnectedChat = connect(
//     (state: IMessagesState, ownProps: IChatProps) => ({ messages: state.all }),
//     { getMessages: fetchMessagesActionCreator })(Chat);

export const ConnectedApp = connect((state: Store.IUsersState) => ({
    user: state.user,
}),
{
    fetchUser: reducers.fetchUserActionCreator,
})(App);

export const ConnectedLogin = connect(undefined,
{
    fetchUser: reducers.fetchUserActionCreator,
})(Login);
