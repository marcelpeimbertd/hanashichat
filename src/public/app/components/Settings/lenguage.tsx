import React from 'react';
import { translate } from 'react-i18next';
import { Options } from 'react-i18next/src/I18n';
import './settings';

interface ILanguage {
    abbr: string;
    txt: string;
}
type ILanguages = ILanguage[];

class Lenguage extends React.Component<Options>{
    private languages = [{
        abbr: 'es',
        txt: 'Español',
    },
    {
        abbr: 'en',
        txt: 'English',
    },
    ];
    public render() {
        const { i18n } = this.props;
        const changeLanguage = (lng: string) => {
            i18n.changeLanguage(lng);
        };
        return <div className="language">
            <select name="languageSelect" id="languageSelect"
                className="options"
                onChange={(event) => changeLanguage((event.target as HTMLSelectElement).value)}>
                {this.createOptions(i18n.language, ...this.languages)}
            </select>
        </div >;
    }
    private createOptions = (current: string, ...languages: ILanguage[]) => {
        if (languages.length) {
            return languages.map(
                (language) => <option value={language.abbr}
                    selected={current === language.abbr}>
                    {language.txt}
                </option>);
        }
    }
}

export default translate('translations')(Lenguage);
