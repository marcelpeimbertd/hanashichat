import { createStore } from 'redux';
import * as reducers from './reducers';

export const store = createStore(reducers.reducerUser, reducers.initialStateUsers);
