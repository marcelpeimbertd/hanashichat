import { combineReducers, createStore } from 'redux';
import { reducerConversation as conversation, reducersUsers as users} from './reducers';

const storeReducer = combineReducers<{}>({ users, conversation });

export const store = createStore(storeReducer);
