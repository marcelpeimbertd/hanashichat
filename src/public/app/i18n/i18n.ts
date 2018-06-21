import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
    debug: true,
    defaultNS: 'translations',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ',',
    },
    // have a common namespace used around the full app
    keySeparator: false, // we use content as keys
    ns: ['translations'],
    react: {
        wait: true,
    },
    // we init with resources
    resources: {
        en: {
            translations: {
                'Chats': 'Chats',
                'Contacts': 'Contacts',
                'Enter Password': 'Enter your Password',
                'Enter your user name': 'Enter your user name',
                'Password': 'Password',
                'Say Hello': 'Say Hello',
                'Search': 'Search',
                'Send': 'Send',
                'UserName': 'UserName',
                'Write a message': 'Write a message',
            },
        },
        es: {
            translations: {
                'Chats': 'Conversaciones',
                'Contacts': 'Contactos',
                'Enter Password': 'Ingrese su contraseña',
                'Enter your user name': 'Ingrese su nombre de usuario',
                'Password': 'Contraseña',
                'Say Hello': 'Saluda',
                'Search': 'Buscar',
                'Send': 'Enviar',
                'UserName': 'Usuario',
                'Write a message': 'Escribe un mensaje',
            },
        },
    },
});

export default i18n;
