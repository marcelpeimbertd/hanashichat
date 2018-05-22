import Redux from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

// Messages
const FETCH_MESSAGES = 'FETCH_MESSAGES';
const initialStateMessages: Store.IMessagesState = { messages: [] };

export const fetchMessagesActionCreator = createAction<Store.IMessagesPayload>(FETCH_MESSAGES);

export const reducerMessages = handleAction<{ messages: Store.IMessages } | undefined, Store.IMessagesPayload>(
    FETCH_MESSAGES,
    (state, { payload = { messages: [] } }) => ({ ...state, messages: payload.messages }), initialStateMessages);

// Users
const FETCH_USERS = 'users/FETCH_USERS';
const FETCH_USER = 'users/FETCH_USER';
const initialStateUser: Store.IUser = {
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

type UsersPayload = Store.IUsersPayload & Store.IUserPayload;

export const users = handleActions<Store.IUsersState, UsersPayload>({
    [FETCH_USERS]: (state, { payload = { users: [] } }) => ({
        ...state,
        users: payload.users,
    }),
    [FETCH_USER]: (state, { payload = { user: initialStateUser } }) => ({
        ...state,
        user: payload.user,
    }),
}, initialStateUsers);
