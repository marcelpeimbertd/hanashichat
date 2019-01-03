import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import rp from 'request-promise';
// import User from '../../models/user';

export default function initPassport() {
    passport.use(new LocalStrategy((username, password, done) => {
        console.log(username, password);
        let AUTH_URI = process.env.AUTH_URI ||'http://127.0.0.1:5000/api';
        console.log(AUTH_URI);
        
        rp.post(`${AUTH_URI}/login`
            , { body: { username, password }, json: true })
            .then(({ user, message }) => {
                user ?
                    done(null, user) :
                    done(null, false, { message });
            })
            .catch(({ message }) => {
                console.log('Failing');
                done(null, false, { message });
            });
    }));
}
