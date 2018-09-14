import { createAction, createActions } from 'redux-actions';

const FETCH_CONVERSATION = 'FETCH_CONVERSATION';
const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';

export const { fetchConversation, updateConversation } = createActions<Store.IConversationPayload>({
    [FETCH_CONVERSATION]: (conversation) => ({ conversation }),
    [UPDATE_CONVERSATION]: (conversation) => ({ conversation }),
});

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USER = 'FETCH_USER';
export const fetchUsers = createAction<Store.IUsersPayload, Store.IUsers>(FETCH_USERS, (users) => ({ users }));

export const fetchUser = createAction<Store.IUserPayload, Store.IUser>(FETCH_USER, (user) => ({ user }));
