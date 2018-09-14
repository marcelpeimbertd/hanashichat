import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from '../i18n/i18n';
import { store } from '../store';
import routes from './routes';

export default (<Provider store={store}>
        <I18nextProvider i18n={i18n}>
                {routes}
        </I18nextProvider>
</Provider>);
