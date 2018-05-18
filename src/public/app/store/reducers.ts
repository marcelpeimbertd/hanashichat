import Redux from 'redux';
import { createAction, handleAction } from 'redux-actions';

// Messages
const FETCH_MESSAGES = 'FETCH_MESSAGES';
const initialStateMessages: Store.IMessagesState = { messages: [] };

export const fetchMessagesActionCreator = createAction<Store.IMessagesPayload>(FETCH_MESSAGES);

export const reducerMessages = handleAction<{ messages: Store.IMessages } | undefined, Store.IMessagesPayload>(
    FETCH_MESSAGES,
    (state, { payload = { messages: [] } }) => ({ ...state, messages: payload.messages }), initialStateMessages);

// Users
const FETCH_USERS = 'FETCH_USERS';
const FETCH_USER = 'FETCH_USER';
const initialStateUser = {
    contacts: [],
    conversations: [],
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    username: '',
};

export const initialStateUsers: Store.IUsersState = {
    user: initialStateUser,
    users: [],
};

export const fetchUsersActionCreator = createAction<Store.IUsersPayload>(FETCH_USERS);

export const fetchUserActionCreator = createAction<Store.IUserPayload>(FETCH_USER);

export const reducerUsers = handleAction<{ users: Store.IUsers } | undefined, Store.IUsersPayload>(
    FETCH_USERS,
    (state, { payload = { users: [] } }) => ({ ...state, users: payload.users }), initialStateUsers);

export const reducerUser = handleAction<{ user: Store.IUser } | undefined, Store.IUserPayload>(
    FETCH_USER,
    (state, { payload = {
        user: initialStateUser,
    } }) => ({ ...state, user: payload.user }), initialStateUsers);

// convesations
interface IConversation {
    id: string;
    chat: string;
    name: string;
    emails: string;
    messages: Store.IMessage[];
}
