import passport from 'passport';
import User, { UserDocumentType } from '../models/user';
import loadStrategy from './strategies/local';

export default function () {
    passport.serializeUser<UserDocumentType, string>((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser<UserDocumentType, string>((id, done) => {
        User.findOne({
            _id: id,
        }, '-password -salt', (err, user) => {
            if (user) {
                done(err, user);
            }
        });
    });
    loadStrategy();
    return passport;
}
