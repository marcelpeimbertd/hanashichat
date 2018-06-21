import React from 'react';
import { translate } from 'react-i18next';
import { Options } from 'react-i18next/src/I18n';

class Lenguage extends React.Component<Options>{
    public render() {
        const { i18n } = this.props;
        const changeLanguage = (lng: string) => {
            i18n.changeLanguage(lng);
        };
        return <div>
            <button onClick={() => changeLanguage('es')}>es</button>
            <button onClick={() => changeLanguage('en')}>en</button>
        </div>;
    }
}

export default translate('translations')(Lenguage);
