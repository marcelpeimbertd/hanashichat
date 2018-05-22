import { combineReducers, createStore } from 'redux';
import { initialStateUsers, users } from './reducers';

const storeReducer = combineReducers<{}>({ users });

export const store = createStore(storeReducer, initialStateUsers);
