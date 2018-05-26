import { combineReducers, createStore } from 'redux';
import { reducers as users} from './reducers';

const storeReducer = combineReducers<{}>({ users });

export const store = createStore(storeReducer);
