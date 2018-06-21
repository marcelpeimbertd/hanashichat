import { createAction, handleAction, handleActions } from 'redux-actions';

// Conversation
interface IConversationState {
    current: Store.IConversation;
    update: Store.IConversation;
}
const FETCH_CONVERSATION = 'FETCH_CONVERSATION';
const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
const initialStateConversation: IConversationState = {
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

export const fetchConversationActionCreator = createAction<Store.IConversationPayload>(FETCH_CONVERSATION);

export const updateConversationActionCreator = createAction<Store.IConversationPayload>(UPDATE_CONVERSATION);

export const reducerConversation =
    handleActions<IConversationState, Store.IConversationPayload>({
        [FETCH_CONVERSATION]: (state, { payload = { conversation: initialStateConversation.current } }) => ({
            ...state,
            current: payload.conversation,
        }),
        [UPDATE_CONVERSATION]: (state, { payload = { conversation: initialStateConversation.current } }) => ({
            ...state,
            update: payload.conversation,
        }),
    }, initialStateConversation);

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
    all: [],
    user: initialStateUser,
};

export const fetchUsersActionCreator = createAction<Store.IUsersPayload>(FETCH_USERS);

export const fetchUserActionCreator = createAction<Store.IUserPayload>(FETCH_USER);

type UsersPayload = Store.IUsersPayload & Store.IUserPayload;

export const reducersUsers = handleActions<Store.IUsersState, UsersPayload>({
    [FETCH_USERS]: (state, { payload = { users: [] } }) => ({
        ...state,
        all: payload.users,
    }),
    [FETCH_USER]: (state, { payload = { user: initialStateUser } }) => ({
        ...state,
        user: payload.user,
    }),
}, initialStateUsers);
