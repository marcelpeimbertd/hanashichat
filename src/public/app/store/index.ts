import { combineReducers, createStore } from 'redux';
import { conversation, users } from './reducers';

const storeReducer = combineReducers<Store.IRootState>({ users, conversation });
export const store = createStore(storeReducer);
