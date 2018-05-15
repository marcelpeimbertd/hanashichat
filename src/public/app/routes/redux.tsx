import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { handleMessage } from '../reducers';
import { ConnectedChat } from './connections';

const store = createStore(handleMessage);
export default (
    <Provider store={store}>
        <ConnectedChat />
    </Provider>
);
