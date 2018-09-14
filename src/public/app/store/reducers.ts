import { Action, handleActions, ReducerMap } from 'redux-actions';
import { fetchConversation, fetchUser, fetchUsers, updateConversation } from './actions';

// Conversation
interface IConversationState {
    current: Store.IConversation;
    update: Store.IConversation;
}
export const initialStateConversation: IConversationState = {
    current: {
        id: '',
        messages: {
            current: {
                date: new Date(),
                message: '',
                userid: '',
            },
            previous: [],
        },
        name: '',
        participants: [],
    },
    update: {
        id: '',
        messages: {
            current: {
                date: new Date(),
                message: '',
                userid: '',
            },
            previous: [],
        },
        name: '',
        participants: [],
    },
};

const mapReducerConversation: ReducerMap<IConversationState | undefined, Store.IConversationPayload> = {
    [fetchConversation.toString()]: (
        state = initialStateConversation,
        {
            payload = { conversation: initialStateConversation.current },
        }) => ({
            ...state,
            current: payload.conversation,
        }),
    [updateConversation.toString()]: (
        state = initialStateConversation,
        {
            payload = { conversation: initialStateConversation.current },
        }) => ({
            ...state,
            update: payload.conversation,
        }),
};
export const conversation =
    handleActions<IConversationState | undefined, Store.IConversationPayload>(
        mapReducerConversation,
        initialStateConversation);

// Users
export const initialStateUser: Store.IUser = {
    contacts: [],
    conversations: [],
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    username: '',
};

export const initialStateUsers: Store.IUsersState = {
    all: [],
    user: initialStateUser,
};

type UsersPayload = Store.IUsersPayload & Store.IUserPayload;

export const users = handleActions<Store.IUsersState | undefined, UsersPayload>({
    [fetchUsers.toString()]: (state = initialStateUsers, { payload = { users: [] } }) => ({
        ...state,
        all: payload.users,
    }),
    [fetchUser.toString()]: (state = initialStateUsers, { payload = { user: initialStateUser } }) => ({
        ...state,
        user: payload.user,
    }),
}, initialStateUsers);
