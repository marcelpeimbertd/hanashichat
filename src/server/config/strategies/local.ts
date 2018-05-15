import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';

export default function () {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username })
            .then((user) => {
                user
                    ? user.authenticate(password)
                        ? done(null, user)
                        : done(null, false, { message: 'Invalid password' })
                    : done(null, false, { message: 'Unknown user' });
            })
    }));
}